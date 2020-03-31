import json
import recognize
from flask import Flask, render_template, jsonify, request

app = Flask(__name__, static_folder='./build/static', template_folder='./build')

@app.route('/api/cr', methods=['POST'])
def test():
    pic = request.get_json()['pic']
    ans = recognize.get_predict(pic)
    return jsonify(pic=pic, ans=ans[0])

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000) #5000番に指定しておく・webpack.config.jsとpackage.jsonにproxy設定忘れない