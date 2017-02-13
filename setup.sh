cd /Users/adamzucker/Documents/Dropbox/Final_Project/image-caption-generation
export FLASK_APP=application.py
source venv/bin/activate
webpack --watch &
cd project
flask run
