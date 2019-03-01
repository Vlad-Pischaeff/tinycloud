import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Description from '@material-ui/icons/Description';
import { sizing } from '@material-ui/system';
import { palette } from '@material-ui/system';

var $ = require('jquery');

class Item extends Component {

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

	render() {
	const {file} = this.props
	const keyItem = this.props.keyItem
//	console.log("props=" + this.props);

	if (file.type =='dir') 
	  return (
		<ListItem button>
			<Grid container direction="row">
				<Grid item width="5%">
					<Checkbox tabIndex={-1} height={10} 
						disableRipple 
						onChange={()=>this._handleCheck(file.name, keyItem, file.checked, file.type)} 
						checked={file.checked}/>
				</Grid>
				<Grid item width="95%">
				<ListItem onClick={(e) => this._handleClick(this.replaceSpace(file.name))} >
					<Avatar>
						<WorkIcon />
					</Avatar>
					<ListItemText primary={file.name} secondary={file.date} />
				</ListItem>
				</Grid>
			</Grid>
		</ListItem>
	  );
	else 
		return (
		<ListItem button>
			<Grid container direction="row">
				<Grid item width="5%" >
					<Checkbox tabIndex={-1} 
						disableRipple 
						onChange={()=>this._handleCheck(file.name, keyItem, file.checked, file.type)} 
						checked={file.checked}/>
				</Grid>
				<Grid item width="95%" >
				<ListItem>
					<Avatar>
						<Description />
					</Avatar>
					<ListItemText primary={file.name} secondary={file.date + "   Size: " + file.size} />
				</ListItem>
				</Grid>
			</Grid>
		</ListItem>
		);

	}
}

/*Item.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default Item;
