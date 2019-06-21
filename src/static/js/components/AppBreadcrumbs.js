import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

var $ = require('jquery');

const styles = theme => ({
  button: {
    margin: theme.spacing(0),
    maxWidth: "15vw",
  },
  text:{
    maxWidth: "15vw",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left",
  },
  icon: {
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.8),
    marginBottom: theme.spacing(0.8),
    width: "1em",
    height: "1em",
  },
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
		<div>
      <Breadcrumbs aria-label="Breadcrumb">
        <IconButton className={classes.icon} size="medium" color="inherit" aria-label="Home" onClick={this.props.getHomeList} >
          <HomeIcon />
        </IconButton>
        {listBreadcrumbs}
      </Breadcrumbs>
		</div>
    );
  }
}

export default  withStyles(styles)(AppBreadcrumbs);
