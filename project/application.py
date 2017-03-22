from flask import Flask, flash, redirect, render_template, request, session, url_for
from PIL import ExifTags, Image

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
    # TODO: remove show eventually
    #  image.show()
    image.close()
    # TODO: return image
    return "hello"

if __name__ == "__main__":
    app.run()

# TODO: put in separate file and clean up
# TODO: do more with EXIF data
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

def get_oriented_image(image, exif):
    if exif['Orientation'] == 3:
        image = image.rotate(180, expand=True)
    elif exif['Orientation'] == 6:
        image = image.rotate(270, expand=True)
    elif exif['Orientation'] == 8:
        image = image.rotate(90, expand=True)
    return image
