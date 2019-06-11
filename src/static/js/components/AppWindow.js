import React, { Component } from 'react';
import ItemList from './ItemList';
import ModalCreateDir from './ModalCreateDir';
import ModalRemoveItem from './ModalRemoveItem';
import ModalPasteItems from './ModalPasteItems';
import ModalUploadFiles from './ModalUploadFiles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
//import classNames from 'classnames';

//import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Undo from '@material-ui/icons/Undo';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Delete from '@material-ui/icons/Delete';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//let download = require('./download');

var $ = require('jquery');

const BUFFER = 4 * 1024 * 1024;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontSize: "1em",
    color: "grey",
    backgroundColor: "white",
    border: "1px solid grey",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  paper:{
    width: '100%', 
    height: '70vh',
  },
});

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    position: 'absolute', 
    right: '-2em', 
    top: '-7.5em',
  },
}))(Tooltip);

class AppWindow extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 	items: [],
						OpenModalCreateDir: false,
						OpenModalRemoveItem: false,
						OpenModalUploadFiles: false,
						OpenModalPasteItems: false,
						ClearListItemsForDelete: false,
						dirChecked: {},
						filesChecked: {},
						uploadState: {},
            uploadChunkState: {},
						itemsForCopyOrMove: [],
						};

		//document.addEventListener('DOMContentLoaded', this.getDirList);
	}
  
  componentWillMount() {
    this.getHomeList();
  }

	replaceSpace(str) {
		return str.replace( /\s/g, "%20" );
	}
	
	getDirList = () => {
  	$.get(window.location.href + 'ls', (data) => {
			this.setState({items: data});
		});
	}

	setDirList = (data) => { 
		this.setState({ items: data });
		this.setState({ dirChecked: {}, filesChecked: {}});
	}

	getHomeList = () => {
  	$.get(window.location.href + 'home', (data) => {
			this.setState({items: data});
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}

	getBackList = () => {
  	$.get(window.location.href + 'back', (data) => {
			this.setState({items: data});
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}
	
	isNotEmpty(obj) {
		for (var key in obj)
			return true;
		return false;
	}
	
	buttonDisabled() {
		if (!this.isNotEmpty(this.state.filesChecked))
			if (!this.isNotEmpty(this.state.dirChecked))
				return true;
		return false;	
	}
	
	rmDir = () => {
		if (this.isNotEmpty(this.state.filesChecked)) {
			var obj = this.state.filesChecked;			
			for (var key in obj) {
				$.get(window.location.href + 'rmfile', 
					{ "file": obj[key] },
					(data) => {
						this.setState({items: data});
					});
				console.log("---files deleted---", obj[key]);	
			}
			this.setState({ filesChecked: {} });
		}
		if (this.isNotEmpty(this.state.dirChecked)) {
			var obj = this.state.dirChecked;			
			for (var key in obj) {
				$.get(window.location.href + 'rmdir', 
					{ "dir": obj[key] },
					(data) => {
						this.setState({items: data});
					});
				console.log("---dirs deleted---", obj[key]);	
			}
			this.setState({ dirChecked: {} });
		}
	}
	
	setDelItem = (data, i, c, t) => {
		if (t == "dir")	{
			var obj = this.state.dirChecked;
			(c) ? obj[i] = data : delete obj[i];
			this.setState({dirChecked: obj});
//			console.log("dir=", this.state.dirChecked, obj, c, t, i);
		}
		else {
			var obj = this.state.filesChecked;
			(c) ? obj[i] = data : delete obj[i];
			this.setState({filesChecked: obj});
//			console.log("file=", this.state.filesChecked, obj, c, t, i);
		}
	}
	
	openModalCreateDir = () => {
		this.setState({ OpenModalCreateDir: true });
		this.setState({ dirChecked: {}, filesChecked: {}});
	}

	closeModalCreateDir = () => {
		this.setState({ OpenModalCreateDir: false });
		this.state.items.forEach(function(e){
			e.checked = false;
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}
	
	openModalRemoveItem = () => {
		this.setState({ OpenModalRemoveItem: true });
	}
	
	closeModalRemoveItem = () => {
		this.setState({ OpenModalRemoveItem: false });
		this.state.items.forEach(function(e){
			e.checked = false;
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}
	
	openModalPasteItem = () => {
		this.setState({ OpenModalPasteItems: true });
	}
	
/*	async function agetPost(e) {
		let response = await fetch('upload', { method: 'POST', body: e, });
		let data = await response.json();
		console.log("async data--", data);
	}*/
		
  escapeUnicode(str) {
    return str.replace(/[^\0-~]/g, function(ch) {
        return "\\u" + ("000" + ch.charCodeAt().toString(16)).slice(-4);
    });
  }
  
	uploadFile = (file) => {
		this.setState({OpenModalUploadFiles: !this.state.OpenModalUploadFiles});
//		const data = new FormData();
		for (var i = 0; i < file.files.length; i++) {
//			data.append('file', file.files[i]);
//      data.append('filename', file.files[i]['name']);
//      console.log('file--', file.files[i]);
//			this.chkFormData(data);
			this.getPost(file.files[i]);
		}
	}
	
	getPost = (file) => {
    let filename = file['name'];
    let element = this.state.items.filter(n => (n.type =='file' && n.name == filename)) || [];
    let START = 0;
    if (element.length != 0 ) START = +element[0].rawsize;
    console.log('START--', START, element.length, element, this.state.items);
    //let START = startPosition || 0; //при докачке - с какой позиции докачивать файл
    let chunk = null;
    let last_chunk = false; 
    let i = this.state.uploadChunkState[filename] || 0;
    let start = (i * BUFFER) + START;
    let end = ((i + 1) * BUFFER) + START;
    
    chunk = file.slice(start, end);
    if (end > file['size']) {
        last_chunk = true;
    }
      
    console.log('i--', i, START, start,  end, file['size'], last_chunk, this.state.uploadChunkState[filename]);
    this.getPostXHR(file, chunk, i, last_chunk, START);
	}
	
  getPostXHR = (file, chunk, index, last_chunk, START) => {
    let filename = file['name'];
    let obj = this.state.uploadState;
    let cnk = this.state.uploadChunkState;
    console.log('Chunk--', this.state.uploadChunkState[filename]);
/*    let element = this.state.items.filter(n => (n.type =='file' && n.name == filename)) || [];
    let startPostiton = 0;
    console.log('element--', element, element.length);
    if (element.length != 0 )
      startPostiton = +element[0].rawsize;
*/    
		let xhr = new XMLHttpRequest();

		xhr.open("POST", "/upload", true);

    xhr.setRequestHeader('Content-Name', this.escapeUnicode(file['name']));
    xhr.setRequestHeader('Content-Size', file['size']);
    xhr.setRequestHeader('Chunk-Number', index);
    xhr.setRequestHeader('Chunk-Last', last_chunk);
    xhr.responseType = "json";
    xhr.timeout = 20000;
    
    xhr.ontimeout = (e) => {
        alert(file['name'] + ' upload failed');
        delete this.state.uploadState[filename];
        delete this.state.uploadChunkState[filename];
        if (!this.isNotEmpty(this.state.uploadState)) {
          console.log('Timeout--', this.state.uploadState, this.state.uploadChunkState[filename]);
          this.setState({OpenModalUploadFiles: false});
          this.getDirList();
         }
    };
		
    xhr.onload = (e) => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					//if (!this.isNotEmpty(this.state.uploadState))
					console.log("OnLoad --", xhr.response['filename'], xhr.response['chunk']);
					//status = true;
        } else {
					console.log('OnLoadError--', xhr.statusText);
				}
			}
      console.log('Load--', xhr.statusText);
		};

    xhr.onloadend = (e) => {
      console.log('OnLoaded--', xhr.statusText, last_chunk, xhr.response['filename'], xhr.response['chunk'], this.state.uploadState);
      if ((xhr.statusText == 'OK') && ( last_chunk == true )) {
        delete this.state.uploadState[filename];
        delete this.state.uploadChunkState[filename];
        if (!this.isNotEmpty(this.state.uploadState)) {
          this.setState({OpenModalUploadFiles: false});
          this.getDirList();
        }
      }
      else {
        if (xhr.response['filename'] == filename) {
          cnk[filename] = +xhr.response['chunk'] + 1;
          this.setState({ uploadChunkState: cnk }, () => (this.getPost(file)));
        }
      }
    }

		xhr.onerror = (e) => {
			console.log('OnError--', xhr.statusText);
		};

		xhr.upload.onprogress = (event) => {
      let n = this.state.uploadChunkState[filename] || 0;
      let i = obj[filename] || 0;
      let p = ~~(((+event.loaded + (n * BUFFER) + START) / +file['size']) * 100);
      if (i < p) {
        obj[filename] = p;
        this.setState({ uploadState: obj});
      }
		}

    xhr.send(chunk);
	}
  
	chkFormData = (data) => {
		for (var [key, value] of data.entries()) { 
			console.log("key=" , key, "value=", value);
		}
	}
	
	downloadItem = () => {
		var obj = this.state.filesChecked;
		for (let key in obj) {
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "/download", true);
			xhr.responseType = "blob";
			xhr.onload = (event) => {
				let header = xhr.getResponseHeader('Content-Disposition');
				let fileName = header.replace("attachment; filename=","");
				let blob = xhr.response;
				//reset checkbox in item = obj[key]
				for (var i in this.state.items) {
					if (this.state.items[i].name == obj[key]) this.state.items[i].checked = false;
				}
				//remove item from list of checked files
				delete obj[key];
				this.setState({ filesChecked: obj });
				//download item
				let a = document.createElement("a");
				a.style = "display: none";
				document.body.appendChild(a);
				let url = window.URL.createObjectURL(blob);
				//window.open(url); //for pdf, txt
				a.href = url;
				a.download = fileName;
				a.click();
				setTimeout(() => {window.URL.revokeObjectURL(url);}, 100);
    			// For Firefox it is necessary to delay revoking the ObjectURL
		
//				download(blob, fileName, "application/octet-stream" );
			};
			let data = JSON.stringify({ "item" : obj[key] });
			xhr.send(data);
		};
		//console.log("2---");
		//this.getDirList();
	}	
	
//	downloadItem = () => {	
//		if (this.isNotEmpty(this.state.filesChecked)) {
//			var obj = this.state.filesChecked;		
//			for (let key in obj) {
//				fetch('/download', { method: 'POST', 
//									 headers: {	'Accept': 'application/json, text/plain, */*',
//												'Content-Type': 'application/json' }, 
//									 body: JSON.stringify({ "item" : obj[key] }), 
//									})
//					.then((response) => {
//						if(response.ok) {
//							return response.blob();
//						}
//						throw new Error('Network response was not ok.');
//						})
//					.then((myBlob) => {
//						download(myBlob, obj[key], "application/octet-stream" );
//						delete obj[key];
//						this.setState({ filesChecked: obj });
//						});
//			}
//			this.setState({ filesChecked: {} });
//		}
//	}

	addToBundleFinal = (name, type, act) => {
		let mass = this.state.itemsForCopyOrMove;
		if (!mass.some((element) => element['name'] == name)) {
			let obj = {};
			obj['name'] = name;
			obj['type'] = type;
			obj['action'] = act;
			$.get(window.location.href + 'pwd', (data) => {
				obj['path'] = data;
			});
			mass.push(obj);
			this.setState({itemsForCopyOrMove: mass});
//			console.log("itemsForCopyOrMove--", this.state.itemsForCopyOrMove);
		}
	}
	
	removeFromBundle = (name) => {
		let mass = this.state.itemsForCopyOrMove;
		var new_mass = mass.filter((element) => element['name'] != name);
		this.setState({itemsForCopyOrMove: new_mass});
//		console.log("itemsForCopyOrMove--", this.state.itemsForCopyOrMove);
	}
	
	render() {
	const { classes } = this.props;
  const sortItems = this.state.items.sort((a, b) => {
		if (a.type == b.type)
			return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
		else
			return a.type == 'file' ? 1 : -1;
  });
  
		return (
		<>  
			<Grid container direction="column">
			<Grid container direction="row">
				<div className="Header" style={{width:"90%"}}>
				<LightTooltip title="Home" >
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
               onClick={this.getHomeList}>
						<Home />
					</Fab>
				</LightTooltip >

				<LightTooltip title="Back">
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
               onClick={this.getBackList}>
						<Undo />
					</Fab>
				</LightTooltip >

				<LightTooltip title="Create Directory" >
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
               onClick={this.openModalCreateDir}>
						<CreateNewFolder />
					</Fab>
				</LightTooltip >
				
				<LightTooltip title="Upload File" >
					<Fab size="small" variant="contained" color="primary" className={classes.button}
               component="label">
						<CloudUpload />
						<input type="file" multiple style={{ display: "none" }}
                   onChange={(e)=>{this.uploadFile(e.currentTarget)}}/>
					</Fab>
				</LightTooltip >
				
				<LightTooltip title="Download File" >
					<Fab size="small" variant="contained" color="primary" className={classes.button}
               component="label" onClick={this.downloadItem}
               disabled={this.buttonDisabled()} >
						<CloudDownload />
					</Fab>
				</LightTooltip >

				<LightTooltip title="Delete Item" >
					<Fab size="small" variant="contained" color="secondary" className={classes.button} 
               onClick={this.openModalRemoveItem} 
               disabled={this.buttonDisabled()} >
						<Delete />
					</Fab>
				</LightTooltip >
				</div>
				
				<div className="HeaderLeft" style={{width:"10%"}}>
					<IconButton aria-label="Cart" onClick={this.openModalPasteItem} >
					<Badge badgeContent={this.state.itemsForCopyOrMove.length} color="primary" classes={{ badge: classes.badge }}>
						<ShoppingCartIcon />
					</Badge>
					</IconButton>
				</div>
			</Grid>
      
			<Grid container direction="row">
        <Grid item style={{width:"20%"}} >
          <Paper square={true} className={classes.paper} >
          </Paper>
        </Grid>
        <Grid item style={{width:"80%"}} >
          <Paper square={true} className={classes.paper} >
            <ItemList items={sortItems} _setDirList={this.setDirList}
                                        ___setDelItem={this.setDelItem}	
                                        ___addToBundle={this.addToBundleFinal} />
          </Paper>
				</Grid>
      </Grid>  
    </Grid>
    
 				<ModalCreateDir openWindow={this.state.OpenModalCreateDir} 
								closeWindow={this.closeModalCreateDir} 
								callbackMkDir={this.setDirList}	/>

				<ModalRemoveItem openWindow={this.state.OpenModalRemoveItem}
								 closeWindow={this.closeModalRemoveItem} 
								 callbackRemoveItem={this.rmDir} />
								
				<ModalUploadFiles openWindow={this.state.OpenModalUploadFiles} 
								  state={this.state.uploadState} />
				
				<ModalPasteItems  openWindow={this.state.OpenModalPasteItems}
								  clearContent={()=>this.setState({ itemsForCopyOrMove: [] }) }	
								  listContent={this.setDirList}
								  removeItemFromContent={this.removeFromBundle}
								  closeWindow={()=>this.setState({ OpenModalPasteItems: false })}		
								  items={this.state.itemsForCopyOrMove} />
    </>              
			
		);
	}
}

AppWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppWindow);
