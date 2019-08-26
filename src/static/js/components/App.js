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
   text: {
      fontFamily: 'OCR A Extended V3',
      fontSize: '1.5em',
      fontStyle: 'normal',
      color: '#FFFFFF',
      position: 'absolute',
      right: '10px',
      top: '5px',
      letterSpacing: '1.6px',
      animation: '$slidein ease-out 5s infinite alternate',
   },
   '@keyframes slidein': {
      from:  {textShadow: 'none',},
      to:    {textShadow: '0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #FFF, 0 0 30px #FFF, 0 0 40px #FFF, 0 0 55px #FFF, 0 0 75px #FFF',}
   }
});

class App extends Component {
   render() {
   const { classes } = this.props;

      return (

         <Grid container direction="column">

            <Grid item className={classes.item}>
            </Grid>

            <Grid item className={classes.item}>
               <div className={classes.text}> tinyCLOUD </div>
            </Grid>

            <Grid item style={{height: '80vh'}}>
               <AppWindow />
            </Grid>

         </Grid>

      );
   }
}

export default withStyles(styles)(App);
