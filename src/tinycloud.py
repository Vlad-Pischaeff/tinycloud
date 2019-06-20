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

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

path =  os.path.abspath(os.path.dirname(sys.argv[0]))
conf_file = path + '/tinycloud.conf'
tmp_file = path + '/.tinycloud._tmp'

with open(conf_file, 'r') as f:
  data = json.loads(f.read())
directory = data["directory"]
os.chdir(directory)
HOME_DIR = directory
f.close()

data = { "curr_dir": directory}
with open(tmp_file, 'w+') as f:
  json.dump(data, f)
f.close()

app = Flask(__name__, static_folder="./static/dist", template_folder="../public")
app.secret_key = os.urandom(24)

def save_dir(str):
  data = { "curr_dir": str}
  with open(tmp_file, 'w+') as f:
    json.dump(data, f)
  f.close()

def load_dir():
  with open(tmp_file, 'r') as f:
    data = json.loads(f.read())
  curr_dir = data["curr_dir"]
  f.close()
  return curr_dir

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
    timestamp = os.stat(os.path.join(replacer(dir), entry.name)).st_mtime
    dt = datetime.fromtimestamp(timestamp) 
    df = "{:%Y %b %d, %H:%M:%S}".format(dt)
    if entry.is_dir():
       d = { "checked": bool(), "type": "dir", "name": entry.name, "date": df }
    if entry.is_file():
       filesize  = os.stat(os.path.join(replacer(dir), entry.name)).st_size
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
    dir = load_dir()
    return lsDir(dir)

@app.route("/cd", methods=["GET", "POST"])
def cd():
    dir = load_dir()
    dir = dir + '/' + request.args['dir']
    os.chdir(replacer(dir))
    save_dir(dir)
    return lsDir(dir)

@app.route("/pwd", methods=["GET", "POST"])
def pwd():
    return os.getcwd()

@app.route("/home", methods=["GET", "POST"])
def home():
    dir = HOME_DIR
    os.chdir(replacer(dir))
    save_dir(dir)
    return lsDir(dir)

@app.route("/back", methods=["GET", "POST"])
def back():
    dir = load_dir()
    if len(dir) > len(HOME_DIR):
      os.chdir(replacer(dir))
      os.chdir("..")
      dir = os.getcwd()
      save_dir(dir)
      return lsDir(dir)
    else:
      return lsDir(HOME_DIR)

@app.route("/mkdir", methods=["GET", "POST"])
def mkdir():
    dir = load_dir()
    os.chdir(replacer(dir))
    os.mkdir(request.args['dir'])
    return ls()

@app.route("/rmdir", methods=["GET", "POST"])
def rmdir():
    dir = load_dir()
    curr_dir1 = dir  + '/' + replacer(request.args['dir'])
    for root, dirs, files in os.walk(curr_dir1, topdown=False):
      for name in files:
        os.remove(os.path.join(root, name))
      for name in dirs:
        os.rmdir(os.path.join(root, name))
    os.rmdir(curr_dir1)
    return ls()
	
@app.route("/rmfile", methods=["GET", "POST"])
def rmfile():
    dir = load_dir()
    filename = replacer(request.args['file'])
    try:
      os.chdir(replacer(dir))
      os.remove(filename)
      print("Deleted %s " % filename)
    except:
      print("Error while deleting %s " % filename)
    return ls()

@app.route('/download', methods=["GET", "POST"])
def fileDownload():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    source = replacer(load_dir())
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
    dir = load_dir()
    chunk = request.headers.get('Chunk-Number')
    chunk_last = request.headers.get('Chunk-Last')
    file_size = int(request.headers.get('Content-Size'))
    filename = request.headers.get('Content-Name').encode('ascii').decode('unicode-escape')
    print("upload - %s" % filename)

    destination="/".join([dir, filename])

    with open(destination, 'ab+') as f:
      chunk_size = 4 * 1024 * 1024
      b = request.stream.read(chunk_size)
      f.write(b)
      if chunk_last == "true":
        os.fsync(f)
        f.close()
        print("upload %s finished" % f)

    data={"filename":filename, "chunk":chunk}
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.route("/rename", methods=["GET", "POST"])
def rename():
    dir = load_dir()
    newfile = "/".join([dir, request.args['newname']])
    oldfile = "/".join([dir, request.args['oldname']])
    if newfile:
       os.rename(oldfile, newfile)
    return lsDir(dir)

@app.route("/paste", methods=["GET", "POST"])
def paste():
    dir = load_dir()
    filename = request.args['name']
    filepath = request.args['path']
    fileact = request.args['act']
    source = "/".join([filepath, filename])
    dst = "/".join([dir, filename])
    tmp = source + ".tmp"
#    print("copy  file %s to %s, %s" % (source, destination, tmp))
    if (fileact=='copy'):
       if os.path.isdir(source):
          shutil.copytree(source, tmp, False, None)
          os.rename(tmp, dst)  
       else:
          shutil.copy2(source, dir)
    if (fileact=='move'):
          os.rename(source, dst)  
    return lsDir(dir)

if __name__ == "__main__":
    app.run(debug=True)

