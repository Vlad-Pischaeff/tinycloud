import React from 'react';

export default class ItemName extends React.Component {

render() {
	const fontWeight = this.props.fontWeight
	
	if (fontWeight) 
		return (
			<div>
				{this.props.name}
			</div>
		); 
	else
		return (	  
			<div style={{ fontWeight: "bold" }} >
				{this.props.name}
			</div>
		);
  }
}

