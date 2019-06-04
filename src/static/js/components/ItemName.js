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

render() {
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
  
  const Name = <div style={style}>
                 <Tooltip title={this.props.name} placement="top-start">
                   <span ref={r => this.content = r}> {this.props.name}</span>
                 </Tooltip>
               </div>;

    return (
          <>
            {Name}
          </>
		);
  }
}

