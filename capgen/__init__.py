from flask import Flask, jsonify, render_template, request, session
from flask_session import Session
from tempfile import gettempdir
from capgen.ProcessedImage import InvalidImageException, ProcessedImage

app = Flask(__name__)
app.config['SESSION_FILE_DIR'] = gettempdir()
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    try:
        if request.files:
            session['image'] = ProcessedImage(image_file=request.files['image'])
        else:
            session['image'] = ProcessedImage(
                image_url=request.get_json()['image_url']
            )
    except InvalidImageException as e:
        return str(e), 500
    return session['image'].get_base64_string()

@app.route('/reset', methods=['POST'])
def reset():
    session.clear()
    return ''

@app.route('/caption', methods=['POST'])
def caption():
    caption = session['image'].get_caption()
    return caption

if __name__ == '__main__':
    app.run()
