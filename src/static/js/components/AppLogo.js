import React, { Component } from 'react';

class AppLogo extends Component {
    render() {
        return (
            <div className="AppLogo">
                 <img src={require('../img/Logo2.png')} alt="tinyCLOUD" height="100%" width="100%"/>
            </div>
        );
    }
}

export default AppLogo;

