import React, { Component } from 'react';
import ModalRenameFile from './ModalRenameFile';
import ModalPlayVideo from './ModalPlayVideo';
import Item from './Item'

class ItemList extends Component {
	constructor(props) {
		super(props);
		this.state = {
      OpenModalRenameFile: false,
      OpenModalPlayVideo: false,
      name: "",
      str:"",  
		};
	}
  
  openModalRenameFile  = (e) => {
		this.setState({ OpenModalRenameFile: true });
    this.setState({ name: e});
  }
  
  closeModalRenameFile = (e) => {
		this.setState({ OpenModalRenameFile: false });
  }

	closeModalPlayVideo = (e) => {
		this.setState({ OpenModalPlayVideo: false });
  }
	
  playVideo = (url, name) => {
    this.setState({ name: url });
		this.setState({ str: name });
    this.setState({ OpenModalPlayVideo: true });
  }
  
//transit: forms content of new directory from ModalRenameFile to AppWindow
	__setDirList = (data) => {
		this.props._setDirList(data);
	}
	
//transit: forms lists for delete from Item to AppWindow 
	__setDelItem = (data, i, c, t) => {
		this.props.___setDelItem(data, i, c, t);
	}

	__addToBundle = (name, type, act) => {
		this.props.___addToBundle(name, type, act);
	}
	
	render() {
	
	const {items} = this.props

	const sortItems = items.sort( function(a, b) {
		if (a.type == b.type)
			return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
		else
			return a.type == 'file' ? 1 : -1;
    });

	const dirElements = sortItems.map((n, i) => <Item 	keyItem={i} file={n} 
                                                      _setDelItem={this.__setDelItem} 
                                                      _setDirList={this.__setDirList} 
                                                      _addToBundle={this.__addToBundle}
                                                      _playVideo={this.playVideo}
                                                      _openModalRenameFile={this.openModalRenameFile} /> );
	return (
    <>
      {dirElements}
    
      <ModalRenameFile openWindow={this.state.OpenModalRenameFile} filename={this.state.name}
                       closeWindow={this.closeModalRenameFile}  
                       ___setDirList={this.__setDirList} />
                       
      <ModalPlayVideo  openWindow={this.state.OpenModalPlayVideo} filename={this.state.name} str={this.state.str}
                       closeWindow={this.closeModalPlayVideo} />
    </>
	);

	}
}

export default ItemList;
