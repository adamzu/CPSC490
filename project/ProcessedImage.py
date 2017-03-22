from io import BytesIO
from PIL import ExifTags, Image

import base64

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
        except (AttributeError, KeyError, IndexError):
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
