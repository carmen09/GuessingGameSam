import os
import re
import sys
from base64 import b64encode
from pprint import pprint
from random import randint
from time import strftime, localtime, time
from traceback import print_exc, format_exc

from flask import Flask, request, redirect, jsonify, logging, make_response, render_template, \
    send_file, send_from_directory, url_for, session, abort
from werkzeug.routing import BaseConverter

app = Flask(__name__)

randints = {}

@app.route("/")
def index():
    cookie = request.cookies.get("user-verify-cookie")
    if cookie:
        return render_template("index.html")
    else:
        response = make_response(render_template("index.html"))
        cookie = b64encode(os.urandom(32)).decode("utf8")
        response.set_cookie("user-verify-cookie", cookie, max_age=time() + 300)
        randints[cookie] = randint(1,100)
        print(cookie)
        print(randints)
        return response

@app.route("/guess")
def guess():
    guess = request.args.get("guess")
    try:
        guess = int(guess)
        if guess < 0 or guess > 100:
            return "no range"
        elif guess < randints.get(request.cookies.get("user-verify-cookie")):
            return "little"
        elif guess == randints.get(request.cookies.get("user-verify-cookie")):
            randints.pop(request.cookies.get("user-verify-cookie"))
            return "ok"
        elif guess > randints.get(request.cookies.get("user-verify-cookie")):
            return "big"
    except:
        return "no type"

if __name__ == "__main__":
    app.run(
        "0.0.0.0",
        80,
        debug=True,
    )
