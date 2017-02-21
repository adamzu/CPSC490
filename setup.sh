export FLASK_APP=application.py
export FLASK_DEBUG=1
source venv/bin/activate
webpack --watch &
cd project
flask run
