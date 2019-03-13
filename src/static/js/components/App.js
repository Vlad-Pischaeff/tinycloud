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
			<Grid item style={{height:"30px"}}>
				<AppLogo />
			</Grid>
			
			<Grid item style={{height:"30px"}} >
				<MenuGlobal />
			</Grid>
			
			<Grid item>
				<div className="AppWindow" >
					<AppWindow />
				</div>
			</Grid>
		</Grid>

    );
  }
}

export default App;
