from flask import Flask, render_template, request, session
from flask_session import Session
from tempfile import gettempdir
from ProcessedImage import ProcessedImage

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
    session['image'] = ProcessedImage(request.files['image'])
    return session['image'].get_base64_string()

@app.route('/caption', methods=['POST'])
def caption():
    return "This is the caption."

if __name__ == '__main__':
    app.run()
