import React from 'react';
import ReactDOM from "react-dom";
import Tooltip from '@material-ui/core/Tooltip';

export default class ItemName extends React.Component {

	placeSpace(str) {
		return str.replace( /%20/g, " " );
	}

	render() {
	const {name} = this.props;

	const style = {	whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							fontWeight: this.props.fontWeight
						};

	const Name = <div style={style}>
						<Tooltip title={this.placeSpace(name)} placement="top-start">
							<span ref={r => this.content = r}> {this.placeSpace(name)}</span>
						</Tooltip>
					 </div>;

		return (
			<>
				{Name}
			</>
		);
	}
}

