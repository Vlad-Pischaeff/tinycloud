import React, { Component } from 'react';

class AppLogo extends Component {
   render() {
      return (
         <>
            <img src={require('../img/tinycloud.svg')}
                 style={{ position:"absolute", top:"0px", right:"1px", height:"24px" }} />
         </>
      );
   }
}

export default AppLogo;

