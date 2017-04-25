export FLASK_APP=capgen
export FLASK_DEBUG=1
source venv/bin/activate
webpack --watch &
python run.py
