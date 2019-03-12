import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var $ = require('jquery');

export default class ModalRemoveItem extends React.Component {

  handleCloseCancel = () => {
	this.props.closeWindow();
  };

  handleCloseOK = () => {
	this.props.callbackRemoveItem();
	this.props.closeWindow();
  };
  
  handleKeyPress = (e) => {
	if (e.key === 'Enter') {
		this.handleCloseOK();
	}
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openWindow}
          onClose={this.handleCloseCancel}
		  onKeyPress={this.handleKeyPress}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you shure to remove this tiems?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It is unsafe operation
            </DialogContentText>
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

