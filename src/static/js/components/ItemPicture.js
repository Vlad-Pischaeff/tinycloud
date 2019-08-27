import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemName from './ItemName';

const styles = theme => ({
   thumbnail: {
      maxWidth: "48px", 
      maxHeight: "48px",
      margin: "auto",
   },
   item: {
      paddingTop: "0", 
      paddingBottom: "0",
   },
});

class ItemPicture extends Component {

/*   replaceSpace(str) {
      return str.replace( /\s/g, "%20" );
   }*/

   render() {
   const {classes, file, showButtons, width, handleShowPicture, showThumbnail, hideThumbnail} = this.props;

      return (

         <Grid container direction="row" style={{ width: width }} id="myFile" 
               onClick={() => handleShowPicture(file.name)} className={classes.item} tooltip={file.name}>
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img src={'show/' + file.name} className={classes.thumbnail} 
                    onMouseOver={() => showThumbnail(file.name)} 
                    onMouseOut={() => hideThumbnail()} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
            <ListItemText primary={<ItemName name={file.name} fontWeight={showButtons ? 'normal' : 'bold'} />} 
                          secondary={file.date + "   Size: " + file.size} style={{width:"100%"}} />
            </Grid>
         </Grid>

      );
   }
}

ItemPicture.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemPicture);
