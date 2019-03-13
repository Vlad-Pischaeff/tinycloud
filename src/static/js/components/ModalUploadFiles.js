import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

export default class ModalUploadFiles extends React.Component {

	render() {
		
		const uploadElements = Object.keys(this.props.state).map((n) =>
				<div>
				<ListItem >
					<Avatar>
						<CircularProgress variant="static" value={this.props.state[n]} />
					</Avatar>
					<ListItemText primary={n} />
				</ListItem>
				</div>
				);
						
		return (
		<div>
        <Dialog
			open={this.props.openWindow}
			aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Uploading files</DialogTitle>
			<DialogContent>
			
				{uploadElements}
				
			</DialogContent>
        </Dialog>
		</div>
		);
	}
}

