import React, { Component } from 'react';
import AppLogo from './AppLogo'
import MenuGlobal from './MenuGlobal'
import AppWindow from './AppWindow'
import Grid from '@material-ui/core/Grid';
import 'bootstrap'

class App extends Component {
  render() {
    return (

		<Grid container direction="column">
			<Grid item height="5%">
				<div className="AppLogo">
					<AppLogo />
				</div>
			</Grid>
			
			<Grid item height="5%" >
				<div className="MenuGlobal">
					<MenuGlobal />
				</div>
			</Grid>
			
			<Grid item height="80%" >
				<div className="AppWindow" >
					<AppWindow />
				</div>
			</Grid>
		</Grid>

    );
  }
}

export default App;
