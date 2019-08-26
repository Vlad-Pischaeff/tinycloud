import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Edit from '@material-ui/icons/Edit'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ItemName from './ItemName';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
   button: {
      width: "40px", 
      minWidth: "0",
   },
   thumbnail: {
      maxWidth: "48px", 
      maxHeight: "48px",
      margin: "auto",
   },
   image24: {
      width: "24px", 
      height: "24px",
   },
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

var $ = require('jquery');


class Item extends Component {
   state = {
      showButtons: true,
      name: "",
      str: "",
   };

   openDir = (item) => {
      $.get(window.location.href + 'cd',
         { "dir": item },
         (data) => this.props._setDirList(data, item));
	}

   setDelItem = (data, i, c, t) => {
      this.props.file.checked = !this.props.file.checked;
      this.props._setDelItem(this.replaceSpace(data), i, !c, t);
   }

   replaceSpace(str) {
      return str.replace( /\s/g, "%20" );
   }

   handleClickItem = (e, name) => {
      e.preventDefault();
      var ext = name.toLowerCase().slice(-3);
      if ((ext == 'pdf') || (ext == 'txt'))  {
         if (e.type === 'click') {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/download", true);
            xhr.responseType = "blob";
            xhr.onload = (event) => {
               let blob = xhr.response;
               let a = document.createElement("a");
               a.style = "display: none";
               document.body.appendChild(a);
               let url = window.URL.createObjectURL(blob);
               setTimeout(() => {window.open(url);}, 100);
            };
            let data = JSON.stringify({ "item" : name });
            xhr.send(data);
            console.log('Left click', name, ext);
         } else if (e.type === 'contextmenu') {
            console.log('Right click', e, name);
         }
      }
      if ((ext == 'mp4') || (ext == 'mpeg4'))  {
         if (e.type === 'click') {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/download", true);
            xhr.responseType = "blob";
            xhr.onload = (event) => {
               let blob = xhr.response;
               let a = document.createElement("a");
               a.style = "display: none";
               document.body.appendChild(a);
               let url = window.URL.createObjectURL(blob);
               this.props._playVideo(url, name);
            };
            let data = JSON.stringify({ "item" : name });
            xhr.send(data);
            console.log('Left click', name, ext);
         } else if (e.type === 'contextmenu') {
            console.log('Right click', e, name);
         }
      }
   }

   handleShowPicture = (name) => {
      this.props.showPicture(name);
//    console.log('click show picture', name);
   }

   handleOnMouseEnter = (e) => {
//    console.log("handleOnMouseEnter", this.state.showButtons);
      this.setState({ showButtons: false });
   }

   handleOnMouseLeave = (e) => {
//    console.log("handleOnMouseLeave", this.state.showButtons);
      this.setState({ showButtons: true });
   }

   addToBundle = (name, type, act) => {
      this.props._addToBundle(name, type, act);
   }

   showThumbnail = (name) => {
//    console.log('showThumbnail', name);
      this.props._showThumbnail(name);
   }

   hideThumbnail = () => {
//    console.log('hideThumbnail', name);
      this.props._hideThumbnail();
   }

   render() {
   const {classes} = this.props;
   const {file} = this.props;
   const keyItem = this.props.keyItem;
   const pictures = ['.jpg', 'jpeg', '.svg', '.png', '.gif', '.bmp', '.ico', 'webp'];

   let FileOrDir;
   if (file.type == 'dir') 
      FileOrDir =	(
         <Grid container direction="row" style={{ width:"70%" }} id="myDir" 
               onClick={() => this.openDir(this.replaceSpace(file.name))} className={classes.item} >
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img src={require('../img/Folder-blue.svg')} className={classes.image48} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
               <ListItemText primary={<ItemName name={file.name} fontWeight={this.state.showButtons ? 'normal' : 'bold'} />} 
                             secondary={file.date} style={{ width:"100%" }} />
            </Grid>
         </Grid> )
   else if (pictures.some(n => n === file.name.slice(-4).toLowerCase()))
      FileOrDir =	(
         <Grid container direction="row" style={{ width:"70%" }} id="myFile" 
               onClick={()=>this.handleShowPicture(file.name)} className={classes.item} tooltip={file.name}>
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img  src={'show/' + file.name} className={classes.thumbnail} 
                     onMouseOver={() => this.showThumbnail(file.name)} 
                     onMouseOut={() => this.hideThumbnail()} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
            <ListItemText primary={<ItemName name={file.name} fontWeight={this.state.showButtons ? 'normal' : 'bold'} />} 
                          secondary={file.date + "   Size: " + file.size} style={{width:"100%"}} />
            </Grid>
         </Grid> )
   else 
      FileOrDir =	(
         <Grid container direction="row" style={{ width:"70%" }} id="myFile" 
               onClick={(e)=>this.handleClickItem(e, file.name)} 
               onContextMenu={(e)=>this.handleClickItem(e, file.name)} className={classes.item} tooltip={file.name}>
            <Grid item style={{ width:"15%",display:"flex" }}>
               <img src={require('../img/App-generic.svg')} className={classes.image48} />
            </Grid>
            <Grid item style={{ width:"85%" }}>
               <ListItemText primary={<ItemName name={file.name} fontWeight={this.state.showButtons ? 'normal' : 'bold'} />} 
                             secondary={file.date + "   Size: " + file.size} style={{width:"100%"}} />
            </Grid>
         </Grid> );

   const buttonEdit = (!this.state.showButtons)
      ? <Tooltip title="Rename Item" placement="top">
            <Button className={classes.button} size="small" variant="outlined" color="primary"
                    onClick={()=>this.props._openModalRenameFile(file.name)} >
               <Edit />
            </Button>
         </Tooltip> 
      : null
   const buttonCopy = (!this.state.showButtons)
      ? <Tooltip title="Copy Item" placement="top">
            <Button className={classes.button} size="small" variant="outlined" color="primary"
                    onClick={()=>this.addToBundle(file.name, file.type, 'copy')} >
               <img src={require('../img/copy1.svg')} className={classes.image24} />
            </Button>
         </Tooltip>
      : null
   const buttonMove = (!this.state.showButtons)
      ? <Tooltip title="Move Item" placement="top">
            <Button className={classes.button} size="small" variant="outlined" color="primary"
                    onClick={()=>this.addToBundle(file.name, file.type, 'move')} >
               <img src={require('../img/cut1.svg')} className={classes.image24} />
            </Button>
         </Tooltip> 
      : null

      return (

      <ListItem button onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} 
                className={classes.item}>
         <Grid container direction="row">
            <Grid item style={{ width:"5%", display:"flex" }}>
               <Checkbox tabIndex={-1} height={10} style={{ margin:"auto" }} disableRipple 
                         onChange={()=>this.setDelItem(file.name, keyItem, file.checked, file.type)} 
                         checked={file.checked}/>
            </Grid>

            {FileOrDir}

            <Grid item style={{ width:"25%" }}>
               {buttonEdit}
               {buttonCopy}
               {buttonMove}
            </Grid>

         </Grid>
      </ListItem>

      );
   }
}

Item.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
