import React from 'react';

export default class ItemName extends React.Component {

render() {
	const fontWeight = this.props.fontWeight

  const Name = (fontWeight)
                ? <div> {this.props.name}	</div> 
                : <div style={{ fontWeight: "bold" }}> {this.props.name} </div> ;

    return (
          <>
            {Name}
          </>
		);
  }
}

