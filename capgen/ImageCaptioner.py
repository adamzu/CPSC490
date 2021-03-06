from capgen import config
from clarifai.rest import ClarifaiApp
from nltk.corpus import wordnet as wn
from string import punctuation as PUNCTUATION
from tempfile import NamedTemporaryFile

import nltk
import subprocess

nltk.data.path.append('./nltk_data/')
IM2TXT_SCRIPT = './generate-caption.sh'

class ImageCaptioner():
    def __init__(self, PIL_image):
        self.PIL_image = PIL_image

    # Example - sanitize the following:
    #     Captions for image test.jpg:
    #       0) a little girl sitting in front of a birthday cake . (p=0.000078)
    #       1) a little girl is holding a teddy bear . (p=0.000062)
    #       2) a little girl sitting in front of a cake . (p=0.000044)
    # to this:
    #     A little girl sitting in front of a birthday cake
    def _get_sanitized_caption(self, output):
        if not output:
            return None
        tokens = output.split('\n')[1].strip().split()
        tokens = tokens[1:-1]
        if tokens[-1] == '.':
            tokens.pop()
        tokens[0] = tokens[0].capitalize()
        caption = ' '.join(tokens)
        return caption

    def _get_im2txt_output(self, file_name):
        output = None
        try:
            output = subprocess.check_output(
                [IM2TXT_SCRIPT, file_name]
            ).decode()
        except (subprocess.CalledProcessError, OSError) as e:
            print(e)
        return output

    def _get_clarifai_concepts(self, file_name):
        clarifaiApp = ClarifaiApp(
            app_id=config.CLARIFAI_APP_ID,
            app_secret=config.CLARIFAI_APP_SECRET
        )
        output = clarifaiApp.tag_files([file_name])['outputs'][0]
        return [concept for concept in output['data']['concepts']]

    def _get_hyponyms(self, noun):
        hyponyms = set()
        synsets = wn.synsets(noun, pos=wn.NOUN)
        for synset in synsets:
            for hyponym_synset in synset.hyponyms():
                for lemma in hyponym_synset.lemmas():
                    hyponyms.add(lemma.name().replace('_', ' '))
        return hyponyms

    def _get_replaced_noun(self, noun, concepts):
        hyponyms = self._get_hyponyms(noun)
        for concept in concepts:
            if concept['name'] != noun and concept['name'] in hyponyms:
                return concept['name']
        return noun

    def _is_article(self, token):
        return token.lower() == 'a' or token.lower() == 'an'

    def _get_correct_article(self, noun, original_article):
        article = original_article[0]
        if noun[0] in 'aeiou':
            article += 'n'
        return article

    def _detokenize(self, tokens):
        return ''.join(
            [' ' + token \
                if "'" not in token and token not in PUNCTUATION \
                else token for token in tokens \
            ]
        ).strip()

    def _get_post_processed_caption(self, caption, file_name):
        concepts = self._get_clarifai_concepts(file_name)
        new_caption_tokens = []
        tagged_tokens = nltk.pos_tag(
            nltk.word_tokenize(caption),
            tagset='universal'
        )
        for token, pos in tagged_tokens:
            new_caption_token = token
            if pos == 'NOUN':
                new_caption_token = self._get_replaced_noun(token, concepts)
                if (
                    len(new_caption_tokens) and \
                    new_caption_token != token and \
                    self._is_article(new_caption_tokens[-1])
                ):
                    new_caption_tokens[-1] = self._get_correct_article(
                        new_caption_token,
                        new_caption_tokens[-1]
                    )
            new_caption_tokens.append(new_caption_token)
        return self._detokenize(new_caption_tokens)

    def get_caption(self):
        image_file = NamedTemporaryFile()
        file_name = image_file.name
        self.PIL_image.save(image_file, 'JPEG')
        caption = self._get_sanitized_caption(
            self._get_im2txt_output(file_name)
        )
        if not caption:
            return 'Sorry, I couldn\'t generate a caption for this image...'
        # Toggle block below here for experimental post_processing
        # START
        # print(' pre-processed: {}'.format(caption))
        # caption = self._get_post_processed_caption(caption, file_name)
        # print('post-processed: {}'.format(caption))
        # END
        image_file.close()
        return caption
