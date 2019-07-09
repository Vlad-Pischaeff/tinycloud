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

  state = {
    name:"",
  };

  handleCloseCancel = () => {
    this.props.closeWindow();
    this.setState({ name: "" });
  };

  handleCloseOK = () => {
	this.props.closeWindow();
		$.get(window.location.href + 'mkdir', 
			{ "dir": this.state.name },
    		(data) => {
				this.props.callbackMkDir(data);
			});
    this.setState({ name: "" });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCloseOK();
    }
  }
  
  render() {
    return (
      <div>
        <Dialog open={this.props.openWindow}
                onClose={this.handleCloseCancel}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Directory Name</DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Enter name of your new directory.
            </DialogContentText>
          
            <TextField autoFocus margin="dense" id="newDirName" type="text" fullWidth value={this.state.name}
                       onChange={e => this.setState({ name: e.target.value })} onKeyPress={this.handleKeyPress} />
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

