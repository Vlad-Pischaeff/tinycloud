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

			<Grid item style={{height:"24px", width:"100%"}}>
				<AppLogo />
			</Grid>
			
			<Grid item style={{height:"24px", width:"100%"}} >
				<MenuGlobal />
			</Grid>

			<Grid item>
				<AppWindow />
			</Grid>

		</Grid>

    );
  }
}

export default App;
