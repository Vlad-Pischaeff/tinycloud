import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Edit from '@material-ui/icons/Edit'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ItemName from './ItemName';

const styles = theme => ({
  button: {
    width: "40px", 
    minWidth: "0",
  },
  image24: {
    width: "24px", 
    height: "24px",
  },
  image48: {
    width: "48px", 
    height: "48px",
  },
});

var $ = require('jquery');

class Item extends Component {
	state = {
		showButtons: true,
		name: "",
		str: "",
	};

	openDir = (event) => {
		$.get(window.location.href + 'cd', 
			{ "dir": event },
    		(data) => {
          this.props._setDirList(data);
			});
	}

	setDelItem = (data, i, c, t) => {
		this.props.file.checked = !this.props.file.checked;
		this.props._setDelItem(this.replaceSpace(data), i, !c, t);
	}

	replaceSpace(str) {
		return str.replace( /\s/g, "%20" );
	}
	
	handleClickItem = (e, name) => {
		e.preventDefault();
		var ext = name.toLowerCase().slice(-3);
		if ((ext == 'pdf') || (ext == 'txt'))  {
			if (e.type === 'click') {
				let xhr = new XMLHttpRequest();
				xhr.open("POST", "/download", true);
				xhr.responseType = "blob";
				xhr.onload = (event) => {
					let blob = xhr.response;
					let a = document.createElement("a");
					a.style = "display: none";
					document.body.appendChild(a);
					let url = window.URL.createObjectURL(blob);
					setTimeout(() => {window.open(url);}, 100);
				};
				let data = JSON.stringify({ "item" : name });
				xhr.send(data);
				console.log('Left click', name, ext);
			} else if (e.type === 'contextmenu') {
				console.log('Right click', e, name);
			}
		}
		if ((ext == 'mp4') || (ext == 'mpeg4'))  {
			if (e.type === 'click') {
				let xhr = new XMLHttpRequest();
				xhr.open("POST", "/download", true);
				xhr.responseType = "blob";
				xhr.onload = (event) => {
					let blob = xhr.response;
					let a = document.createElement("a");
					a.style = "display: none";
					document.body.appendChild(a);
					let url = window.URL.createObjectURL(blob);
          this.props._playVideo(url, name);
				};
				let data = JSON.stringify({ "item" : name });
				xhr.send(data);
				console.log('Left click', name, ext);
			} else if (e.type === 'contextmenu') {
				console.log('Right click', e, name);
			}
		}
    }
	
	handleOnMouseEnter   = (e) => {
		this.setState({ showButtons: false });
	};
	
	handleOnMouseLeave   = (e) => {
		this.setState({ showButtons: true });
	};
	
	addToBundle = (name, type, act) => {
		this.props._addToBundle(name, type, act);
	}
	
	render() {
	const {classes} = this.props;
	const {file} = this.props
	const keyItem = this.props.keyItem
  const FileOrDir = (file.type == 'dir') 
      ?	<ListItem id="myDir" onClick={(e) => this.openDir(this.replaceSpace(file.name))} 
                  style={{ paddingTop:"0", paddingBottom:"0" }} >
					<img src={require('../img/Folder-blue.svg')} className={classes.image48} />
					<ListItemText primary={<ItemName name={file.name} fontWeight={this.state.showButtons} />} 
									secondary={file.date} style={{width:"100%"}} />
				</ListItem>    

			:	<ListItem id="myFile" 	onClick={(e)=>this.handleClickItem(e, file.name)} 
									onContextMenu={(e)=>this.handleClickItem(e, file.name)}
                  style={{ paddingTop:"0", paddingBottom:"0" }}>
          <img src={require('../img/App-generic.svg')} className={classes.image48} />
					<ListItemText primary={<ItemName name={file.name} fontWeight={this.state.showButtons} />} 
								  secondary={file.date + "   Size: " + file.size} 
								  style={{width:"100%"}} />
				</ListItem> ;    

	return (

		<ListItem button onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} 
				  style={{paddingTop: "0", paddingBottom: "0" }} >
			<Grid container direction="row">
				<Grid item style={{width:"5%", display:"flex"}} >
					<Checkbox tabIndex={-1} height={10} style={{margin:"auto"}}
						disableRipple 
						onChange={()=>this.setDelItem(file.name, keyItem, file.checked, file.type)} 
						checked={file.checked}/>
				</Grid>
				
				<Grid item style={{width:"65%"}}>
          {FileOrDir}
				</Grid>
				
				<Grid item style={{width:"30%"}}>
					<Tooltip title="Rename Item" placement="top">
					<Button className={classes.button} size="small" variant="outlined" color="primary"
						onClick={()=>this.props._openModalRenameFile(file.name)} hidden={this.state.showButtons} >
						<Edit />
					</Button>
					</Tooltip> 

					<Tooltip title="Copy Item" placement="top">
					<Button className={classes.button} size="small" variant="outlined" color="primary"
						onClick={()=>this.addToBundle(file.name, file.type, 'copy')} hidden={this.state.showButtons} >
						<img src={require('../img/copy1.svg')} className={classes.image24} />
					</Button>
					</Tooltip> 
					
					<Tooltip title="Move Item" placement="top">
					<Button className={classes.button} size="small" variant="outlined" color="primary"
						onClick={()=>this.addToBundle(file.name, file.type, 'move')} hidden={this.state.showButtons} >
						<img src={require('../img/cut1.svg')} className={classes.image24} />
					</Button>
					</Tooltip> 
				</Grid>
			</Grid>
		</ListItem>
         
	  );
	}
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
