import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactPlayer from 'react-player'

export default class ModalPlayVideo extends React.Component {

/*	handleClose = () => {
		this.props.closeWindow();
	};*/

	render() {
		return (

			<Dialog open={this.props.openWindow} onClose={this.props.closeWindow}
						aria-labelledby="form-dialog-title" fullWidth="true" maxWidth="xl" >

				<DialogTitle id="form-dialog-title">Play {this.props.str}
					<IconButton aria-label="Close" style={{position: 'absolute', right: "4px", top: "4px"}} 
									onClick={this.props.closeWindow} >
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent>
					<ReactPlayer ref="vidRef" url={this.props.filename} controls="true" playing="true" width='100%' height='100%'/>
				</DialogContent>

			</Dialog>
		);
	}
}

