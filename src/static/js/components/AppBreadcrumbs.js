import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import { FetchData, PlaceSpace } from './functions.js';

const styles = theme => ({
   button: {
      margin: theme.spacing(0),
      maxWidth: "10vw",
   },
   text: {
      maxWidth: "10vw",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "left",
      },
   grid: {
      width: '5em', 
      height: '5em', 
      background: '#bbbbbb',
   },
   separator: {
      marginLeft: '0px',
      marginRight: '0px',
   }
});

const MyButton = styled(Button)({
   background: 'none',
   borderRadius: 0,
   color: 'black',
   height: '5rem',
   width: '5rem',
});

class AppBreadcrumbs extends Component {

   handleClick = (index) => {
      let path = this.props.dirPath;
      if (index < path.length - 1) {
         var obj = path.filter((n, i) => (i <= index));
         var str = obj.join('/');
         FetchData('cdrand', str, obj, this.props.setItems);
      }
   }

   render() {
   const { classes, getHomeList } = this.props;
   const listBreadcrumbs = this.props.dirPath.map((n,i) =>
      <>
         <Button color="inherit" className={classes.button} onClick={() => this.handleClick(i)}>
            <div className={classes.text}> {PlaceSpace(n)} </div>
         </Button>
      </>
   );

      return (
         <Grid container direction="row" style={{ width:'100%' }}>
            <Grid item className={classes.grid}>

               <MyButton onClick={getHomeList}>
                  <HomeIcon />
               </MyButton>

            </Grid>
            <Grid item style={{ width:'80%' }}>

               <Breadcrumbs classes={{separator: classes.separator}} maxItems={7}>
                  {listBreadcrumbs}
               </Breadcrumbs>

            </Grid>
         </Grid>
      );
   }
}

export default withStyles(styles)(AppBreadcrumbs);
