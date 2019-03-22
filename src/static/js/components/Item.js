import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Edit from '@material-ui/icons/Edit'
import Description from '@material-ui/icons/Description';
import { sizing } from '@material-ui/system';
import { palette } from '@material-ui/system';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ModalRenameFile from './ModalRenameFile';

const styles = theme => ({
  input: {
    width: '20%',
  },
  // Separate this part into it's own CSS class
  inputFocused: {
    width: '40%',
    backgroundColor: "#3f50b5",
	color: "#ffffff",
  },
});

var $ = require('jquery');

class Item extends Component {
	state = {
		OpenModalRenameFile: false,
		changeColor: false,
		showButtons: true,
		name: "",
	};

	_handleClick = (event) => {
		$.get(window.location.href + 'cd', 
			{ "dir": event },
    		(data) => {
				this.props.callbackFromItemList(data);
			});
	}

	_handleCheck = (data, i, c, t) => {
		this.props.file.checked = !this.props.file.checked;
		this.props.setItemsForDelete(this.replaceSpace(data), i, !c, t);
	}

	replaceSpace(str) {
		return str.replace( /\s/g, "%20" );
	}
	
	handleClickItem =(e) => {
/*		e.preventDefault();
        if (e.type === 'click') {
			this.setState({readOnly : true});
			this.setState({changeColor : false});
            console.log('Left click', this.state.changeColor);
        } else if (e.type === 'contextmenu') {
			this.setState({readOnly : false});
			this.setState({changeColor : true});
            console.log('Right click', this.state.changeColor);
        }*/
    }
	
	handleOnMouseEnter   = (e) => {
		this.setState({ showButtons: false });
	};
	
	handleOnMouseLeave   = (e) => {
		this.setState({ showButtons: true });
	};
	
	openModalRenameFile  = (e) => {
		this.setState({ OpenModalRenameFile: true });
    }
	
	closeModalRenameFile = (e) => {
		this.setState({ OpenModalRenameFile: false });
		this.setState({ showButtons: true });
    }

	setDirList = (data) => {
		this.props.callbackFromItemList(data);
	}
	
	addToBundle = (name, type, op) => {
		this.props._addToBundle(name, type, op);
//		console.log("onClick--", name, type, op);
	}
	
	render() {
	const {classes} = this.props;
	const {file} = this.props
	const keyItem = this.props.keyItem
//	console.log("props=", this.props.classes);

	if (file.type =='dir') 
	  return (
		<ListItem button onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
			<Grid container direction="row">
				<Grid item style={{width:"5%"}}>
					<Checkbox tabIndex={-1} height={10} 
						disableRipple 
						onChange={()=>this._handleCheck(file.name, keyItem, file.checked, file.type)} 
						checked={file.checked}/>
				</Grid>
				
				<Grid item style={{width:"65%"}}>
				<ListItem id="myDir" onClick={(e) => this._handleClick(this.replaceSpace(file.name))} >
					<Avatar>
						<WorkIcon />
					</Avatar>
					<ListItemText primary={file.name} secondary={file.date} style={{width:"100%"}} />
				</ListItem>
				</Grid>
				
				<Grid item style={{width:"30%"}}>
					<Tooltip title="Edit Name of Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={this.openModalRenameFile} hidden={this.state.showButtons} >
						<Edit />
					</Button>
					</Tooltip> 

					<Tooltip title="Copy Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={()=>this.addToBundle(file.name, file.type, 'copy')} hidden={this.state.showButtons} >
						<img src={require('../img/copy1.svg')} style={{width:"24px", height:"24px"}} />
					</Button>
					</Tooltip> 
					
					<Tooltip title="Move Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={()=>this.addToBundle(file.name, file.type, 'move')} hidden={this.state.showButtons} >
						<img src={require('../img/cut1.svg')} style={{width:"24px", height:"24px"}} />
					</Button>
					</Tooltip> 
				</Grid>
				
				<ModalRenameFile openWindow={this.state.OpenModalRenameFile} filename={file.name}
							 closeWindow={this.closeModalRenameFile} 
							 callbackRenameItem={this.setDirList} />

			</Grid>
		</ListItem>
	  );
	else 
		return (
		<ListItem button onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
			<Grid container direction="row">

				<Grid item style={{width:"5%"}}>
					<Checkbox tabIndex={-1} 
						disableRipple 
						onChange={()=>this._handleCheck(file.name, keyItem, file.checked, file.type)} 
						checked={file.checked}/>
				</Grid>

				<Grid item style={{width:"65%"}}>
				<ListItem id="myFile" onClick={this.handleClickItem} onContextMenu={this.handleClickItem}>
					<Avatar>
						<Description />
					</Avatar>
					<ListItemText primary={file.name} 
								  secondary={file.date + "   Size: " + file.size} 
								  style={{width:"100%"}} />
				</ListItem>
				</Grid>

				<Grid item style={{width:"30%"}}>
					<Tooltip title="Edit Name of Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={this.openModalRenameFile} hidden={this.state.showButtons}>
						<Edit />
					</Button>
					</Tooltip> 

					<Tooltip title="Copy Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={()=>this.addToBundle(file.name, file.type, 'copy')} hidden={this.state.showButtons} >
						<img src={require('../img/copy1.svg')} style={{width:"24px", height:"24px"}} />
					</Button>
					</Tooltip>
					
					<Tooltip title="Move Item">
					<Button size="small" variant="outlined" color="primary" className={classes.button} 
						onClick={()=>this.addToBundle(file.name, file.type, 'move')} hidden={this.state.showButtons} >
						<img src={require('../img/cut1.svg')} style={{width:"24px", height:"24px"}} />
					</Button>
					</Tooltip> 					
				</Grid>

			</Grid>

			<ModalRenameFile openWindow={this.state.OpenModalRenameFile} filename={file.name}
							 closeWindow={this.closeModalRenameFile} 
							 callbackRenameItem={this.setDirList} />

		</ListItem>
						
		);
	}
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
