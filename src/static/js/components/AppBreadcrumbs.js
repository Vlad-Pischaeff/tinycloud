import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';

var $ = require('jquery');

const styles = theme => ({
  button: {
    margin: theme.spacing(0),
    maxWidth: "10vw",
  },
  text:{
    maxWidth: "10vw",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
  },
  grid:{
    width:'5em', 
    height: '5em', 
    background: '#bbbbbb',
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
  
  handleClick = (index) => {
    if (index < this.props.dirPath.length-1) {
      var obj = this.props.dirPath.filter((n,i) => (i <= index));
      var str = obj.join('/');
      $.get(window.location.href + 'cdrand', 
        { "dir": str },
    		(data) => {
          this.props.setItems(data, obj);
			});
    }
  }
  
  render() {
  const { classes } = this.props;
  
  const listBreadcrumbs = this.props.dirPath.map((n,i) =>
    <>
      <Button color="inherit" className={classes.button} onClick={() => this.handleClick(i)}>
        <div className={classes.text} > {this.placeSpace(n)} </div>
      </Button>
    </>
  );
  
  return (
		<Grid container direction="row" style={{ width:'100%'}}>
    <Grid item className={classes.grid}>
    
      <MyButton onClick={this.props.getHomeList}>
        <HomeIcon />
      </MyButton>
      
    </Grid>
    <Grid item style={{ width:'80%'}}>
    
      <Breadcrumbs maxItems={5}>
        {listBreadcrumbs}
      </Breadcrumbs>
    
    </Grid>
  </Grid>
    );
  }
}

export default  withStyles(styles)(AppBreadcrumbs);
