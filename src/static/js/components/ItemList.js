import React, { Component } from 'react';
import Item from './Item'

class ItemList extends Component {
	constructor(props) {
	 	super(props);
		this.state = { 
		};
	}
	
//transit: forms content of new directory from Item to AppWindow
	__setDirList = (data) => {
		this.props.___setDirList(data);
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

	const dirElements = sortItems.map((n, i) => 
									<li>
										<Item 	keyItem={i} 
												file={n} 
												_setDelItem={this.__setDelItem} 
												_setDirList={this.__setDirList} 
												_addToBundle={this.__addToBundle} />
									</li>);
	return (
		<ol>
			{dirElements}
		</ol>
	);

	}
}

export default ItemList;
