import React, { Component } from 'react';
import ModalRenameFile from './ModalRenameFile';
import ModalPlayVideo from './ModalPlayVideo';
import { List, AutoSizer } from 'react-virtualized';
import Item from './Item'

class ItemList extends Component {

	state = {
		OpenModalRenameFile: false,
		OpenModalPlayVideo: false,
		name: "",
		str: "",
	};

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
	__setDirList = (data, item) => {
		this.props._setDirList(data, item);
	}

//transit: forms lists for delete from Item to AppWindow 
	__setDelItem = (data, i, c, t) => {
		this.props.___setDelItem(data, i, c, t);
	}

	__addToBundle = (name, type, act) => {
		this.props.___addToBundle(name, type, act);
	}
	
	__showThumbnail = (name) => {
		this.props.___showThumbnail(name);
	}

	__hideThumbnail = () => {
		this.props.___hideThumbnail();
	}

	_showPicture = (name) => {
		this.props.__showPicture(name);
	}

	render() {

	const {items} = this.props
//  console.log("update ListItem", items);
	const renderRow = ({index, isScrolling, key, style}) => {
//    console.log("update renderRow", this.props.items);
	return (
		<div key={key} style={style}>
			<Item keyItem={index} file={items[index]} _setDelItem={this.__setDelItem} 
																	_setDirList={this.__setDirList} 
																	_addToBundle={this.__addToBundle}
																	_playVideo={this.playVideo}
																	_openModalRenameFile={this.openModalRenameFile}
																	_showThumbnail={this.__showThumbnail} 
																	_hideThumbnail={this.__hideThumbnail}
																	showPicture={this._showPicture} />
		</div>
	);
	}

	return (
	<>
		<AutoSizer> 
		{
			({ width, height }) => {
				return <List
								rowCount={items.length}
								width={width}
								height={height}
								rowHeight={52}
								rowRenderer={renderRow}
				/>
			}
		}
		</AutoSizer>

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
