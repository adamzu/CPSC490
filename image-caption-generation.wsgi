#!/usr/bin/python3
import sys

activate_this = 'venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

sys.path.insert(0, '/data/clair/capgen')
from application import app
