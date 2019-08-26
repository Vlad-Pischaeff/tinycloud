import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	image: {
		maxHeight: '100vh',
		width: '100%',
		objectFit: 'contain',
		objectPosition: 'center',
	},
	button: {
		backgroundColor: 'rgba(200, 200, 200, 0.5)',
		position: 'absolute', 
		right: "4px", 
		top: "4px", 
		color: 'black',
	},
});

class ModalShowPicture extends React.Component {

	render() {
	const { classes } = this.props;

		return (

			<Dialog open={this.props.openWindow} aria-labelledby="form-dialog-title"  style={{padding: 0}} >
				<img src={'preview/' + this.props.file} className={classes.image} />
				<IconButton aria-label="Close" className={classes.button} onClick={this.props.closeWindow} >
					<CloseIcon />
				</IconButton>
			</Dialog>

		);
	}
}

export default withStyles(styles)(ModalShowPicture);