import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemName from './ItemName';

const styles = theme => ({
   image48: {
      width: "48px", 
      height: "48px",
      margin: "auto",
   },
   item: {
      paddingTop: "0", 
      paddingBottom: "0",
   },
});

class ItemApplication extends Component {

/*   replaceSpace(str) {
      return str.replace( /\s/g, "%20" );
   }*/

   render() {
   const {classes, file, showButtons, width, handleClickItem} = this.props;

      return (

         <Grid container direction="row" style={{ width: width }} id="myFile" 
               onClick={(e) => handleClickItem(e, file.name)} 
               onContextMenu={(e) => handleClickItem(e, file.name)} className={classes.item} tooltip={file.name}>
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img src={require('../img/App-generic.svg')} className={classes.image48} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
               <ListItemText primary={<ItemName name={file.name} fontWeight={showButtons ? 'normal' : 'bold'} />} 
                             secondary={file.date + "   Size: " + file.size} style={{width:"100%"}} />
            </Grid>
         </Grid>

      );
   }
}

ItemApplication.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemApplication);
