import React, { Component } from 'react';
import ItemList from './ItemList';
import ModalCreateDir from './ModalCreateDir';
import ModalRemoveItem from './ModalRemoveItem';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import Undo from '@material-ui/icons/Undo';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Delete from '@material-ui/icons/Delete';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';

let download = require('./download');

var $ = require('jquery');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
});

class AppWindow extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 	items: [],
						OpenModalCreateDir: false,
						OpenModalRemoveItem: false,
						ClearListItemsForDelete: false,
						dirChecked: {},
						filesChecked: {},
						};
		this.getBackList = this.getBackList.bind(this);

		document.addEventListener('DOMContentLoaded', this.getDirList);
	}

	getDirList = () => {
  	$.get(window.location.href + 'ls', (data) => {
			this.setState({items: data});
		});
	}

	setDirList = (data) => { 
		this.setState({items: data});
		this.setState({ dirChecked: {}, filesChecked: {}});		
	}

	getHomeList = () => {
  	$.get(window.location.href + 'home', (data) => {
			this.setState({items: data});
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}

	getBackList() {
  	$.get(window.location.href + 'back', (data) => {
			this.setState({items: data});
		});
		this.setState({ dirChecked: {}, filesChecked: {}});
	}
	
	isNotEmpty(obj){
		for (var key in obj)
			return true;
		return false;
	}
	
	buttonDisabled(){
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
	
	setDelDir = (data, i, c, t) => {
		if (t == "dir")	{
			var obj = this.state.dirChecked;
			(c) ? obj[i] = data : delete obj[i];
			this.setState({dirChecked: obj});
			console.log("dir=", this.state.dirChecked, obj, c, t);
		}
		else {
			var obj = this.state.filesChecked;
			(c) ? obj[i] = data : delete obj[i];
			this.setState({filesChecked: obj});
			console.log("file=", this.state.filesChecked, obj, c, t);
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
	
/*	async function agetPost(e) {
		let response = await fetch('upload', { method: 'POST', body: e, });
		let data = await response.json();
		console.log("async data--", data);
	}*/
	
	uploadFile = (file) => {
		const data = new FormData();
		for (var i = 0; i < file.files.length; i++) {
			data.set('file', file.files[i]);
			this.chkFormData(data);
			this.getPost(data);
		}
	}
	
	getPost = (data) => {
		fetch('/upload', { method: 'POST', body: data, })
			.then((response) => {
				if (response.ok) {
					response.json()
						.then((data) => {
							console.log("data--", data);
							this.getDirList();	
						});
				}
				else console.log("Some error occured...");
				console.log("response--", response);
			});	
	}
	
	chkFormData = (data) => {
		for (var [key, value] of data.entries()) { 
			console.log("key=" , key, "value=", value);
		}
	}
	
	downloadItem = () => {
		if (this.isNotEmpty(this.state.filesChecked)) {
			var obj = this.state.filesChecked;		
			for (var key in obj) {
				fetch('/download', { method: 'POST', 
									 headers: {	'Accept': 'application/json, text/plain, */*',
												'Content-Type': 'application/json' }, 
									 body: JSON.stringify({ 'item': obj[key] }), 
									})
					.then(function(response) {
						if(response.ok) {
							console.log("111");
							return response.blob();
						}
						throw new Error('Network response was not ok.');
						})
					.then(function(myBlob) {
						console.log("222");
						download(myBlob, obj[key], "application/octet-stream" );
						});
				
/*				$.get(window.location.href + 'download', 
					{ "item": obj[key] },
					(data) => {
						this.props.tmpfile = data;
						
						console.log("d data--");
					});
				console.log("---files downloaded---", obj[key]);
				FileSaver.saveAs(this.props.tmpfile, obj[key]);*/
			}
			console.log("333");
			this.setState({ filesChecked: {} });
		}
	}
	
	render() {
	const { classes } = this.props;

//	console.log("ItemList props =", this.props);

		return (
			<div className="AppWindow">
				<h3>"App Window"</h3>
				<Tooltip title="Home">
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
						onClick={this.getHomeList}>
						<Home />
					</Fab>
				</Tooltip >

				<Tooltip title="Back">
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
						onClick={this.getBackList}>
						<Undo />
					</Fab>
				</Tooltip >

				<Tooltip title="Create Directory">
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
						onClick={this.openModalCreateDir}>
						<CreateNewFolder />
					</Fab>
				</Tooltip >
				
				<Tooltip title="Upload File">
					<Fab size="small" variant="contained" color="primary" className={classes.button}
						component="label">
						<CloudUpload />
						<input 	type="file" multiple
								style={{ display: "none" }}
								onChange={(e)=>{this.uploadFile(e.currentTarget)}}/>
					</Fab>
				</Tooltip >
				
				<Tooltip title="Download File">
					<Fab size="small" variant="contained" color="primary" className={classes.button}
						component="label" onClick={this.downloadItem}
						disabled={this.buttonDisabled()} >
						<CloudDownload />
					</Fab>
				</Tooltip >

				<Tooltip title="Delete Item">
					<Fab size="small" variant="contained" color="primary" className={classes.button} 
						onClick={this.openModalRemoveItem} 
						disabled={this.buttonDisabled()} >
						<Delete />
					</Fab>
				</Tooltip >
				
				<ModalCreateDir openWindow={this.state.OpenModalCreateDir} 
								closeWindow={this.closeModalCreateDir} 
								callbackMkDir={this.setDirList}	/>

				<ModalRemoveItem openWindow={this.state.OpenModalRemoveItem}
								closeWindow={this.closeModalRemoveItem} 
								callbackRemoveItem={this.rmDir}/>

				<ItemList 		items={this.state.items} 
								callbackFromAppWindow={this.setDirList}
								callbackFromAppWindowDeleteDir={this.setDelDir}	/>
			</div>
		);
	}
}

AppWindow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppWindow);
