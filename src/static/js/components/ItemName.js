import React from 'react';
import ReactDOM from "react-dom";
import Tooltip from '@material-ui/core/Tooltip';
import { PlaceSpace } from './functions.js';

export default class ItemName extends React.Component {

   render() {
   const {name, fontWeight} = this.props;

   const style = { whiteSpace: "nowrap",
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                   fontWeight: fontWeight
                 };

   const Name = <div style={style}>
                  <Tooltip title={PlaceSpace(name)} placement="top-start">
                     <span ref={r => this.content = r}> {PlaceSpace(name)}</span>
                  </Tooltip>
                </div>;

      return (
         <>
            {Name}
         </>
      );
   }
}

