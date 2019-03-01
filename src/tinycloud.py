#c:/python/python37
from flask import Flask, render_template, jsonify, request, session, Response
from flask import send_file
from datetime import datetime
import time
import os 
import sys
import json
import logging
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
#import cgi
#import cgitb
#cgitb.enable()
#form = cgi.FieldStorage()
#set_dir = form.getvalue('d')
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

path =  os.path.abspath(os.path.dirname(sys.argv[0]))
conf_file = path + '/tinycloud.conf'

with open(conf_file, 'r') as f:
    data = json.loads(f.read())
directory = data["directory"]
os.chdir(directory)
curr_dir = directory
home_dir = directory
f.close()

app = Flask(__name__, static_folder="./static/dist", template_folder="../public")

def replacer(str):
  return str.replace("%20", " ")

def KMGTbytes(b):
  if b < 1024:
    return ("%sB" % b)
  if b < 1048576:
    return ("%.1fkB" % ( b/1024 ))
  if b < 1073741824:
    return ("%.1fMB" % ( b/1048576 ))
  if b < 1099511627776:
    return ("%.1fGB" % ( b/1073741824 ))

def lsDir(dir):
  d = {}
  m = []
  for entry in os.scandir(replacer(dir)):
    timestamp = os.stat(entry.name).st_mtime
    dt = datetime.fromtimestamp(timestamp) 
    df = "{:%Y %b %d, %H:%M:%S}".format(dt)
    if entry.is_dir():
       d = { "checked": bool(), "type": "dir", "name": entry.name, "date": df }
    if entry.is_file():
       filesize  = os.stat(entry.name).st_size
       d = { "checked": bool(), "type": "file", "name": entry.name, "date": df, "size": KMGTbytes(filesize) }
    m.append(d)
  return jsonify(m)
#  return json.dumps(m)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/ls", methods=["GET", "POST"])
def ls():
    return lsDir(curr_dir)

@app.route("/cd", methods=["GET", "POST"])
def cd():
    curr_dir = os.getcwd() + '/' + request.args['dir']
    os.chdir(replacer(curr_dir))
    return lsDir(curr_dir)

@app.route("/home", methods=["GET", "POST"])
def home():
    os.chdir(replacer(home_dir))
    return lsDir(home_dir)

@app.route("/back", methods=["GET", "POST"])
def back():
    if len(os.getcwd()) > len(directory):
      os.chdir("..")
      curr_dir = os.getcwd()
      return lsDir(curr_dir)
    else:
      return lsDir(home_dir)

@app.route("/mkdir", methods=["GET", "POST"])
def mkdir():
    os.mkdir(request.args['dir'])
    curr_dir = os.getcwd()
    return lsDir(curr_dir)

@app.route("/rmdir", methods=["GET", "POST"])
def rmdir():
    curr_dir = os.getcwd()
    curr_dir1 = curr_dir  + '/' + replacer(request.args['dir'])
    for root, dirs, files in os.walk(curr_dir1, topdown=False):
      for name in files:
        os.remove(os.path.join(root, name))
      for name in dirs:
        os.rmdir(os.path.join(root, name))
    os.rmdir(curr_dir1)
    return lsDir(curr_dir)
	
@app.route("/rmfile", methods=["GET", "POST"])
def rmfile():
    curr_dir = os.getcwd()
    os.remove(replacer(request.args['file']))
    print("file to remove--%s" % replacer(request.args['file']))
    return lsDir(curr_dir)

@app.route('/download', methods=["GET", "POST"])
def fileDownload():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    source=os.getcwd()
    data = request.get_data()
    data2 = json.loads(data)
    #data = request.form.to_dict()
    print("request-- %s" % data2['item'])
    filename = replacer(data2['item'])
    path="/".join([source, filename])
    print("path for download %s" % path)
    return send_file(path, as_attachment=True, attachment_filename=filename)
	
@app.route('/upload', methods=['POST','GET'])
def fileUpload():
#    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    target=os.getcwd()
    if not os.path.isdir(target):
       os.mkdir(target)
    global curr_dir 
    curr_dir = target
    file = request.args['file'] 
    logger.info("welcome to upload - %s" % file)
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    data={"Pischaeff": filename}
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)

#print('Content-type: text/html\r\n\r')
#print("<p>hello world!</p>")
#print("I can view this in my browser yay!!")
#for i in os.listdir(directory):
#     print(i)
