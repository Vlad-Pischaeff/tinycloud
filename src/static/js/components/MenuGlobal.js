import React, { Component } from 'react';


class MenuGlobal extends Component {
    render() {
        return (
            <div className="MenuGlobal" > 
							<img src={require('../img/Logo44.svg')} 
									 style={{ position:"absolute", top:"24px", height:"24px", width:"100%" }} />
            </div>
        );
    }
}

export default MenuGlobal;