#!/data/clair/capgen/venv/bin/python
import os, sys
app_dir = os.path.dirname(__file__)
sys.path.insert(0, app_dir)

activate_this = '/data/clair/capgen/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

from capgen import app as application
