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
import ItemDirectory from './ItemDirectory';
import ItemApplication from './ItemApplication';
import ItemPicture from './ItemPicture';
import { FetchData, ReplaceSpace } from './functions.js';

const styles = theme => ({
   button: {
      width: "40px", 
      minWidth: "0",
   },
   image24: {
      width: "24px", 
      height: "24px",
   },
   item: {
      paddingTop: "0", 
      paddingBottom: "0",
   },
});

class Item extends Component {
   state = {
      showButtons: true,
   }

   openDir = (item) => {
      console.log('cd', item);
      FetchData('cd', item, item, this.props._setDirList);
      /*$.get(window.location.href + 'cd',
         { "dir": item },
         (data) => this.props._setDirList(data, item));*/
   }

   setDelItem = (data, i, c, t) => {
      this.props.file.checked = !this.props.file.checked;
      this.props._setDelItem(ReplaceSpace(data), i, !c, t);
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
   }

   handleOnMouseEnter = (e) => {
      this.setState({ showButtons: false });
   }

   handleOnMouseLeave = (e) => {
      this.setState({ showButtons: true });
   }

   addToBundle = (name, type, act) => {
      this.props._addToBundle(name, type, act);
   }

   showThumbnail = (name) => {
      this.props._showThumbnail(name);
   }

   hideThumbnail = () => {
      this.props._hideThumbnail();
   }

   render() {
   const {classes, file, keyItem} = this.props;
   const pictures = ['.jpg', 'jpeg', '.svg', '.png', '.gif', '.bmp', '.ico', 'webp'];

   let FileOrDir;
   if (file.type == 'dir') 
      FileOrDir = <ItemDirectory width={"70%"} file={file} showButtons={this.state.showButtons} openDir={this.openDir} />
   else if (pictures.some(n => n === file.name.slice(-4).toLowerCase()))
      FileOrDir = <ItemPicture width={"70%"} file={file} showButtons={this.state.showButtons} handleShowPicture={this.handleShowPicture} 
                               showThumbnail={this.showThumbnail} hideThumbnail={this.hideThumbnail}  />
   else 
      FileOrDir = <ItemApplication width={"70%"} file={file} showButtons={this.state.showButtons} handleClickItem={this.handleClickItem} />

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
