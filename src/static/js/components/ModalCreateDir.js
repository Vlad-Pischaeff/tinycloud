import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var $ = require('jquery');

export default class ModalCreateDir extends React.Component {

//state.open походу не нужен, нужно только props.open
 
  state = {
//    open: false,
		name:"",
  };

//  handleClickOpen = () => {
//    this.setState({ open: true });
//  };

  handleCloseCancel = () => {
	this.props.closeWindow();
//    this.setState({ open: false });
//		this.props.open = false;
    this.setState({ name: "" });
  };

  handleCloseOK = () => {
		this.props.closeWindow();
//  	this.setState({ open: false });
//		this.props.open = false;
		console.log("dir=" + this.state.name);

		$.get(window.location.href + 'mkdir', 
			{ "dir": this.state.name },
    		(data) => {
				this.props.callbackMkDir(data);
			});

    this.setState({ name: "" });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openWindow}
          onClose={this.handleCloseCancel}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Directory Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
				Enter name of your new directory.
            </DialogContentText>
            <TextField
				autoFocus
				margin="dense"
				id="newDirName"
//              label="New Directory Name"
				type="text"
				fullWidth
				value={this.state.name}
 				onChange={e => this.setState({ name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseOK} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

