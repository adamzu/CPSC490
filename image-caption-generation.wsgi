#!/data/projects/image-caption-generation/venv/bin/python
import sys
sys.path.insert(0, '/data/clair/capgen')

activate_this = '/data/clair/capgen/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

from application import app as application
