cd /Users/adamzucker/Documents/Dropbox/Final_Project/image-caption-generation
export FLASK_APP=application.py
export FLASK_DEBUG=1
source venv/bin/activate
webpack --watch &
cd project
flask run
