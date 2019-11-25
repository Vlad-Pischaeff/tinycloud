# tinycloud
tiny web cloud application ReactJS &amp; Python based
At present it is possible to:
<ul>
	<li>Create Directory
	<li>Delete Directory or Directories
	<li>Delete File or Files
	<li>Download File or Files
	<li>Resumable Upload File or Files
	<li>Rename File or Directory
	<li>Copy File or Directory
	<li>Move File or Directory
	<li>Play .mp4 files
	<li>View .pdf or .txt files
</ul>
<p>
<h2>Easy starting</h2>
<p>
<h3>Windows</h3>
<p>

<ul>
   <li> First, make sure that the following are installed:
   Python 3 (3.7.2 or better)
<li> Run 
<pre><tt>
   pip install flask
   pip install flask_cors
   pip install pillow
</tt></pre>
<li> Create You own project directory structure by
<pre><tt>
   git clone https://github.com/Vlad-Pischaeff/tinycloud.git
</tt></pre>
<li> Come to "<b>src</b>" directory
<pre><tt>
   cd src
</tt></pre>

<li> Edit <b>tinycloud.conf</b>. Point You own shared cloud directory
<li> Change first string of <b>tinycloud.py</b> with Your own path to <b>python.exe</b>
<li> Launch <b>tinycloud.py</b>
<li> In browser connect to <b>http://localhost:5000</b>
<li> Enjoy!
   </ul>

<h3>Linux.</h3>

You can use uwsgi, gunicorn, mod_wsgi and so on. No sence.
