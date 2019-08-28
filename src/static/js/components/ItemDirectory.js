import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemName from './ItemName';
import { ReplaceSpace } from './functions.js';

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

class ItemDirectory extends Component {

   render() {
   const {classes, file, showButtons, width, openDir } = this.props;

      return (

         <Grid container direction="row" style={{ width: width }} id="myDir" 
               onClick={() => openDir(ReplaceSpace(file.name))} className={classes.item} >
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img src={require('../img/Folder-blue.svg')} className={classes.image48} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
               <ListItemText primary={<ItemName name={file.name} fontWeight={showButtons ? 'normal' : 'bold'} />} 
                             secondary={file.date} style={{ width:"100%" }} />
            </Grid>
         </Grid>

      );
   }
}

ItemDirectory.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDirectory);
