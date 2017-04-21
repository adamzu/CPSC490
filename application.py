from flask import Flask, jsonify, render_template, request, session
from flask_session import Session
from flask_socketio import SocketIO, emit
from tempfile import gettempdir
from ProcessedImage import InvalidImageException, ProcessedImage

app = Flask(__name__)
app.config['SESSION_FILE_DIR'] = gettempdir()
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
socketio = SocketIO(app)

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

@socketio.on('reset')
def reset():
    session.clear()

@socketio.on('caption')
def caption():
    emit('caption', session['image'].get_caption())

if __name__ == '__main__':
    socketio.run(app)
