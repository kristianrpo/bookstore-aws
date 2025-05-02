from flask import Blueprint, render_template

home = Blueprint('home', __name__, url_prefix='/objective-1')

@home.route('/')
def index():
    return render_template('home.html')