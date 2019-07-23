import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import GetApp from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import ItemName from './ItemName';

var $ = require('jquery');

export default class ModalPasteItems extends React.Component {
  
	handlePaste = (name, path, action) => {
		$.get(window.location.href + 'paste', 
			{ "name": name,
			  "path": path,
			  "act" : action, },
    		(data) => {
				this.props.listContent(data);
			});
		this.props.removeItemFromContent(name);
	};
  
	render() {
		const {items} = this.props;
    
		const pasteElements = items.map((element) =>
				<div>
				<ListItem>
					<ListItemText primary={<ItemName name={element['name']} fontWeight="normal" />} 
                        secondary={<ItemName name={element['path']} fontWeight="normal" />} />
					<Tooltip title={element['action'] + " Item"}>
					<Button size="small" variant="outlined" color="primary" style={{marginLeft: '1em'}}
							onClick={() => this.handlePaste(element['name'], element['path'], element['action'])} >
						<GetApp />
					</Button>
					</Tooltip>
				</ListItem>
				</div>
				);
						
	return (
		
    <Dialog open={this.props.openWindow} onClose={this.props.closeWindow}	aria-labelledby="form-dialog">

			<DialogTitle id="form-dialog-title">Paste listed items&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <IconButton aria-label="Close" style={{position: 'absolute', right: "4px", top: "4px"}} 
                    onClick={this.props.closeWindow} >
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent>
				{pasteElements}
			</DialogContent>
      
			<DialogActions>
				<Button onClick={this.props.clearContent} color="primary">
					Clear
				</Button>
			</DialogActions>
      
    </Dialog>
		
		);
	}
}

