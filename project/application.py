from flask import Flask, render_template, request, send_file
from io import BytesIO
from PIL import ExifTags, Image

import base64

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    image_data = request.files['image']
    image = Image.open(image_data)
    exif = get_exif_data(image)
    if exif:
        print(exif)
        image = get_oriented_image(image, exif)
    # TODO: return image
    return send_image(image)

if __name__ == "__main__":
    app.run()

# TODO: put in separate file and clean up
def send_image(image):
    image_io = BytesIO()
    image.save(image_io, 'JPEG')
    image.close()
    image_io.seek(0)
    return 'data:image/jpeg;base64,' + base64.b64encode(image_io.getvalue()).decode('ascii')

def get_exif_data(image):
    try:
        exif_data = image._getexif()
        exif = {
            ExifTags.TAGS[k]: v
            for k, v in image._getexif().items() if k in ExifTags.TAGS
        }
        return exif
    except (AttributeError, KeyError, IndexError):
        return false

# TODO: do more with EXIF data
def get_oriented_image(image, exif):
    if exif['Orientation'] == 3:
        image = image.rotate(180, expand=True)
    elif exif['Orientation'] == 6:
        image = image.rotate(270, expand=True)
    elif exif['Orientation'] == 8:
        image = image.rotate(90, expand=True)
    return image
