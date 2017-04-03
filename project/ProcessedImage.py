from io import BytesIO
from PIL import ExifTags, Image
from tempfile import NamedTemporaryFile

import base64
import random
import subprocess

IM2TXT_SCRIPT = './generate-caption.sh'

class ProcessedImage():
    def __init__(self, image_file):
        self.PIL_image = Image.open(image_file)
        self.exif = self._get_exif_data()
        self._orient_image()

    def _get_raw_data(self):
        image_io = BytesIO()
        self.PIL_image.save(image_io, 'JPEG')
        image_io.seek(0)
        return image_io

    def _get_exif_data(self):
        try:
            return {
                ExifTags.TAGS[k]: v
                for k, v in self.PIL_image._getexif().items() if k in ExifTags.TAGS
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
            + base64.b64encode(self._get_raw_data().getvalue()).decode('utf-8')

    def _get_im2txt_output(self):
        image_file = NamedTemporaryFile()
        self.PIL_image.save(image_file, 'JPEG')
        output = None
        try:
            output = subprocess.check_output([IM2TXT_SCRIPT, image_file.name]).decode('utf-8')
        except (CalledProcessError, OSError):
            pass
        image_file.close()
        return output

    def _get_sanitized_caption(self, output):
        # Example - sanitize the following:
        #     Captions for image test.jpg:
        #       0) a little girl sitting in front of a birthday cake . (p=0.000078)
        #       1) a little girl is holding a teddy bear . (p=0.000062)
        #       2) a little girl sitting in front of a cake . (p=0.000044)
        # to this:
        #     A little girl sitting in front of a birthday cake
        if not output:
            return None
        tokens = output.split('\n')[1].strip().split()
        tokens = tokens[1:-1]
        if tokens[-1] == '.':
            tokens.pop()
        tokens[0] = tokens[0].capitalize()
        caption = ' '.join(tokens)
        return caption

    def _get_post_processed_caption(self, caption):
        # TODO: add metadata analysis/nltk stuff here
        return caption

    def get_caption(self):
        caption = self._get_sanitized_caption(self._get_im2txt_output())
        if not caption:
            return 'Sorry, I couldn\'t generate a caption for this image...'
        caption = self._get_post_processed_caption(caption)
        return caption
