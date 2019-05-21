import React, { Component } from 'react';

class AppLogo extends Component {

    render() {
        return (
            <div className="AppLogo" > 
							<img src={require('../img/Logo44.svg')} 
									 style={{ position:"absolute", top:"0px", height:"24px", width:"100%" }} />
							
							<img src={require('../img/tinycloud.svg')} 
									 style={{ position:"absolute", top:"0px", right:"1px", height:"24px" }} />
            </div>
        );
    }
}

export default AppLogo;

