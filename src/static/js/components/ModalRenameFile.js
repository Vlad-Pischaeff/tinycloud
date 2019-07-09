import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var $ = require('jquery');

export default class ModalRenameFile extends React.Component {

  state = {
    name:"",
  };

  handleCloseCancel = () => {
    this.props.closeWindow();
    this.setState({ name: "" });
  };

  handleCloseOK = () => {
    this.props.closeWindow();
		$.get(window.location.href + 'rename', 
			{ "newname": this.state.name,
			  "oldname": this.props.filename },
    	(data) => {
        this.props.___setDirList(data);
			});
    this.setState({ name: "" });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCloseOK();
    }
  }
  
  handleEnter = () => {
    this.setState({ name: this.props.filename });
  }
  
  render() {
    return (

        <Dialog style={{width:"100%"}} open={this.props.openWindow}
                onEnter={this.handleEnter}
                onClose={this.handleCloseCancel}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit File name</DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Change name of your file <b>{this.props.filename}</b>                                   
            </DialogContentText>
            <TextField autoFocus margin="dense" id="newFileName" type="text" fullWidth value={this.state.name}
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

    );
  }
}

