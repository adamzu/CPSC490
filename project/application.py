from flask import Flask, flash, redirect, render_template, request, session, url_for
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

# @app.after_request
# def force_cache_flush(r):
#     r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     r.headers["Pragma"] = "no-cache"
#     r.headers["Expires"] = "0"
#     r.headers['Cache-Control'] = 'public, max-age=0'
#     return r

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
