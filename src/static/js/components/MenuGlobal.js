import React, { Component } from 'react';
import Background from '../img/Logo5.png';

class MenuGlobal extends Component {
    render() {
        return (
            <div className="MenuLogo"
				 style={{ backgroundImage: `url(${Background})`,  
						  backgroundSize: 'cover', 
						  backgroundRepeat: 'no-repeat' }} >
				<p>&nbsp;</p>
            </div>
        );
    }
}

export default MenuGlobal;