# image-caption-generation
Final project for CPSC 490

## To install:
Ensure `python3` and `pip3` are installed. Then do the following:

1. `pip install virtualenv`
1. `virtualenv -p python3 venv; source venv/bin/activate`
1. `pip install -r requirements.txt`
1. `npm install`
1. Replace the line with `PATH` in `~/.profile` with the following: `PATH="$HOME/bin:$HOME/.local/bin:./node_modules/.bin:$PATH"`
1. Install and set up [Tensorflow and its dependencies](https://medium.com/@acrosson/installing-nvidia-cuda-cudnn-tensorflow-and-keras-69bbf33dce8a) (on a computer with a GPU only)

## To run:
In one terminal window, run `./setup.sh` or:

1. `export FLASK_APP=capgen`
1. `export FLASK_DEBUG=1`
1. `source venv/bin/activate`
1. `webpack --watch &`
1. `python run.py`

## To access from ssh connection:
While the Flask server and Webpack are running, run `lt --port=5000` in a separate terminal window (ensure [localtunnel](https://localtunnel.github.io/www/) is installed first). Then, open the returned link in your web browser. Or just use port forwarding...
