from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pages/<path:filename>')
def pages(filename):
    return send_from_directory('static/pages', filename)

if __name__ == '__main__':
    app.run(debug=True)
