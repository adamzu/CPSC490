from capgen import config
from clarifai.rest import ClarifaiApp
from io import BytesIO
from nltk.corpus import wordnet as wn
from PIL import ExifTags, Image
from string import punctuation as PUNCTUATION
from tempfile import NamedTemporaryFile

import base64
import nltk
import random
import requests
import subprocess

import os

nltk.data.path.append('./nltk_data/')
IM2TXT_SCRIPT = './generate-caption.sh'

class InvalidImageException(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)

class ProcessedImage():
    def __init__(self, image_file=None, image_url=None):
        self.clarifaiApp = ClarifaiApp(
            app_id=config.CLARIFAI_APP_ID,
            app_secret=config.CLARIFAI_APP_SECRET
        )
        self.PIL_image = self._get_PIL_image(image_file, image_url)
        self.exif = self._get_exif_data()
        self.caption_process = None
        self._orient_image()

    def _get_PIL_image(self, image_file, image_url):
        PIL_image = None
        if image_file:
            PIL_image = Image.open(image_file)
        elif image_url:
            try:
                PIL_image = Image.open(
                    BytesIO(requests.get(image_url).content)
                )
            except (OSError, requests.RequestException):
                raise InvalidImageException('Invalid image URL')
        else:
            raise InvalidImageException('No parameters supplied')
        return PIL_image

    def _get_raw_data(self):
        image_io = BytesIO()
        self.PIL_image.save(image_io, 'JPEG')
        image_io.seek(0)
        return image_io

    def _get_exif_data(self):
        try:
            return {
                ExifTags.TAGS[k]: v
                for k, v in self.PIL_image._getexif().items() \
                if k in ExifTags.TAGS
            }
        except (AttributeError, IndexError, KeyError):
            return False

    def _orient_image(self):
        if self.exif:
            if self.exif['Orientation'] == 3:
                self.PIL_image = self.PIL_image.rotate(180, expand=True)
            elif self.exif['Orientation'] == 6:
                self.PIL_image = self.PIL_image.rotate(270, expand=True)
            elif self.exif['Orientation'] == 8:
                self.PIL_image = self.PIL_image.rotate(90, expand=True)

    def get_base64_string(self):
        return 'data:image/jpeg;base64,' \
            + base64.b64encode(self._get_raw_data().getvalue()).decode()

    def _get_im2txt_output(self, file_name):
        output = None
        try:
            output = subprocess.check_output(
                [IM2TXT_SCRIPT, file_name]
            ).decode()
        except (subprocess.CalledProcessError, OSError) as e:
            print(e)
        return output

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

    def _get_clarifai_concepts(self, file_name):
        output = self.clarifaiApp.tag_files([file_name])['outputs'][0]
        return [concept for concept in output['data']['concepts']]

    def _detokenize(self, tokens):
        return ''.join(
            [' ' + token \
                if "'" not in token and token not in PUNCTUATION \
                else token for token in tokens \
            ]
        ).strip()

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
            new_caption_tokens.append(new_caption_token)
        return self._detokenize(new_caption_tokens)

    def get_caption(self):
        image_file = NamedTemporaryFile()
        file_name = image_file.name
        self.PIL_image.save(image_file, 'JPEG')
        # TODO: toggle comments below
        # caption = self._get_sanitized_caption(
        #     self._get_im2txt_output(file_name)
        # )
        caption = 'A person sitting in front of a plate of food'
        if not caption:
            # TODO: toggle comments below
            # return 'Sorry, I couldn\'t generate a caption for this image...'
            caption = 'Sorry, I couldn\'t generate a caption for this image...'
        caption = self._get_post_processed_caption(caption, file_name)
        image_file.close()
        return caption
