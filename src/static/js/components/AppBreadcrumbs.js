import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';

//var $ = require('jquery');

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

   placeSpace(str) {
      return str.replace( /%20/g, " " );
   }

   fetchData = (point, str, obj, fn) => {
      let url = window.location.href + point;
      var data = { "dir": str };
      fetch(url, {
         method: 'POST', // or 'PUT'
         body: JSON.stringify(data), // data may be `string` or {object}!
         headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(response => fn(response, obj))
      .catch(error => console.error('cdrand ERR--:', error));
   }

   handleClick = (index) => {
      let path = this.props.dirPath;
      if (index < path.length - 1) {
         var obj = path.filter((n, i) => (i <= index));
         var str = obj.join('/');
         /*$.get(window.location.href + 'cdrand',
            { "dir": str },
            (data) => this.props.setItems(data, obj) );*/

         this.fetchData('cdrand', str, obj, this.props.setItems);
         /*let url = window.location.href + 'cdrand';
         var data = { "dir": str };
         fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data may be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }
         })
         .then(res => res.json())
         .then(response => this.props.setItems(response, obj))
         .catch(error => console.error('cdrand ERR--:', error));*/
      }
   }

   render() {
   const { classes } = this.props;
   const listBreadcrumbs = this.props.dirPath.map((n,i) =>
      <>
         <Button color="inherit" className={classes.button} onClick={() => this.handleClick(i)}>
            <div className={classes.text}> {this.placeSpace(n)} </div>
         </Button>
      </>
   );

      return (
         <Grid container direction="row" style={{ width:'100%' }}>
            <Grid item className={classes.grid}>

               <MyButton onClick={this.props.getHomeList}>
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

export default  withStyles(styles)(AppBreadcrumbs);
