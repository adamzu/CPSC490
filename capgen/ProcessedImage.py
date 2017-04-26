from capgen.ImageCaptioner import ImageCaptioner
from io import BytesIO
from PIL import ExifTags, Image

import base64
import requests

class InvalidImageException(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)

class ProcessedImage():
    def __init__(self, image_file=None, image_url=None):
        self.PIL_image = self._get_PIL_image(image_file, image_url)
        self.exif = self._get_exif_data()
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

    def _get_raw_data(self):
        image_io = BytesIO()
        self.PIL_image.save(image_io, 'JPEG')
        image_io.seek(0)
        return image_io

    def get_base64_string(self):
        return 'data:image/jpeg;base64,' \
            + base64.b64encode(self._get_raw_data().getvalue()).decode()

    def get_caption(self):
        return ImageCaptioner(self.PIL_image).get_caption()
