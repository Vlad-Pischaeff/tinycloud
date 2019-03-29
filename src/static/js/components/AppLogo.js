import React, { Component } from 'react';
import Background from '../img/Logo4.png';

class AppLogo extends Component {
    render() {
        return (
            <div className="AppLogo"
				 style={{ backgroundImage: `url(${Background})`,  
						  backgroundSize: 'cover', 
						  backgroundRepeat: 'no-repeat' }} >
				<p>&nbsp;</p>
            </div>
        );
    }
}

export default AppLogo;

