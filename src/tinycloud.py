#c:/python/python37
from flask import Flask, render_template, jsonify, request, session, Response, make_response
from flask import send_file
from datetime import datetime
import time
import os 
import sys
import json
import logging
import shutil
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
#print("data-- %s" % data)
os.chdir(directory)
curr_dir = directory
home_dir = directory
CURR_DIR = directory
HOME_DIR = directory
f.close()

app = Flask(__name__, static_folder="./static/dist", template_folder="../public")
app.secret_key = os.urandom(24)

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
       d = { "checked": bool(), "type": "file", "name": entry.name, "date": df, "size": KMGTbytes(filesize), "rawsize": filesize }
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
    return lsDir(CURR_DIR)

@app.route("/cd", methods=["GET", "POST"])
def cd():
    global CURR_DIR
    CURR_DIR = CURR_DIR + '/' + request.args['dir']
    os.chdir(replacer(CURR_DIR))
    return lsDir(CURR_DIR)

@app.route("/pwd", methods=["GET", "POST"])
def pwd():
    return os.getcwd()

@app.route("/home", methods=["GET", "POST"])
def home():
    global CURR_DIR
    CURR_DIR = HOME_DIR
    os.chdir(replacer(HOME_DIR))
    return lsDir(HOME_DIR)

@app.route("/back", methods=["GET", "POST"])
def back():
    global CURR_DIR
    if len(os.getcwd()) > len(directory):
      os.chdir("..")
      CURR_DIR = os.getcwd()
      return lsDir(CURR_DIR)
    else:
      return lsDir(HOME_DIR)

@app.route("/mkdir", methods=["GET", "POST"])
def mkdir():
    os.mkdir(request.args['dir'])
    return lsDir(CURR_DIR)

@app.route("/rmdir", methods=["GET", "POST"])
def rmdir():
    curr_dir1 = CURR_DIR  + '/' + replacer(request.args['dir'])
    for root, dirs, files in os.walk(curr_dir1, topdown=False):
      for name in files:
        os.remove(os.path.join(root, name))
      for name in dirs:
        os.rmdir(os.path.join(root, name))
    os.rmdir(curr_dir1)
    return lsDir(CURR_DIR)
	
@app.route("/rmfile", methods=["GET", "POST"])
def rmfile():
    filename = replacer(request.args['file'])
    if os.path.exists(filename): 
       os.remove(filename)
    else:
        print("Can not delete the %s as it doesn't exists" % filename)
    try:
       os.remove(filename)
    except:
        print("Error while deleting %s " % filename)
    return lsDir(CURR_DIR)

@app.route('/download', methods=["GET", "POST"])
def fileDownload():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    source=os.getcwd()
    data = request.data.decode('utf8')
    print("data-- %s" % request.data)
    data2 = json.loads(data)
    #data = request.form.to_dict()
    print("request-- %s" % data2['item'])
    filename = replacer(data2['item'])
    path="/".join([source, filename])
    print("path for download %s" % path)
    return send_file(path, as_attachment=True, attachment_filename=filename)
	
@app.route('/upload', methods=['POST','GET'])
def fileUpload():
    target=os.getcwd()
    if not os.path.isdir(target):
       os.mkdir(target)

    chunk = request.headers.get('Chunk-Number')
    chunk_last = request.headers.get('Chunk-Last')
    file_size = request.headers.get('Content-Size')
    filename = request.headers.get('Content-Name').encode('ascii').decode('unicode-escape')
    print("filename - %s" % filename)
    bytes_left = int(request.headers.get('content-length'))

    destination="/".join([CURR_DIR, filename])

    with open(destination, 'ab+') as f:
      BUFFER = 1048576
      b = request.get_data()
      f.write(b)
      if chunk_last == "true":
        f.close()

    data={"filename":filename, "chunk":chunk}
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route("/rename", methods=["GET", "POST"])
def rename():
    newfile = request.args['newname']
    oldfile = request.args['oldname']
    if newfile:
       os.rename(oldfile, newfile)
    return lsDir(CURR_DIR)

@app.route("/paste", methods=["GET", "POST"])
def paste():
    filename = request.args['name']
    filepath = request.args['path']
    fileact = request.args['act']
    source = "/".join([filepath, filename])
    dst = "/".join([CURR_DIR, filename])
    tmp = source + ".tmp"
#    print("copy  file %s to %s, %s" % (source, destination, tmp))
    if (fileact=='copy'):
       if os.path.isdir(source):
          shutil.copytree(source, tmp, False, None)
          os.rename(tmp, dst)  
       else:
          shutil.copy2(source, CURR_DIR)
    if (fileact=='move'):
          os.rename(source, dst)  
    return lsDir(CURR_DIR)

if __name__ == "__main__":
    app.run(debug=True)

