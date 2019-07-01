import React from 'react';
import ReactDOM from "react-dom";
import Tooltip from '@material-ui/core/Tooltip';

/*const measureElement = element => {
  const DOMNode = ReactDOM.findDOMNode(element);
  return {
    width: DOMNode.offsetWidth,
    height: DOMNode.offsetHeight,
  };
}*/

export default class ItemName extends React.Component {
/*  state = {
    containerWidth: 0,
    contentWidth: 0,
  }

  componentDidMount() {
    console.log("measure--", measureElement(this.content).width, measureElement(this.content).height);
 //   this.content && setState({ contentWidth: measureElement(this.content).width });
  }*/
	
  placeSpace(str) {
		return str.replace( /%20/g, " " );
	}
  
  render() {
  const {name} = this.props;
  
  const style = this.props.fontWeight 
          ? { whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            } 
          : { whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "bold"
            };
  //console.log('style--', style, this.props.fontWeight);
  
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

