import React, { Component } from 'react';
import AppLogo from './AppLogo';
import MenuGlobal from './MenuGlobal';
import AppWindow from './AppWindow';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  item: {
    height: '24px', 
    width: '100%', 
    lineHeight: '1.5', 
    backgroundImage: 'linear-gradient(to right, rgba(51, 72, 150, 1), rgba(9, 104, 175, 1))',
  },
});

class App extends Component {
  render() {
  const { classes } = this.props;
  
  return (

		<Grid container direction="column">

			<Grid item className={classes.item} >
				<AppLogo />
			</Grid>
			
			<Grid item className={classes.item} >
				<MenuGlobal />
			</Grid>

			<Grid item style={{height: '80vh'}} >
				<AppWindow />
			</Grid>

		</Grid>

    );
  }
}

export default withStyles(styles)(App);
