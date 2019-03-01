import React, { Component } from 'react';
import Item from './Item'

class ItemList extends Component {
	constructor(props) {
	 	super(props);
		this.state = { 
		};
	}
	
//transit: forms content of new directory from Item to AppWindow
	ItemListCallback = (data) => {
		this.props.callbackFromAppWindow(data);
	}
	
//transit: forms lists for delete from Item to AppWindow 
	setItemsForDeleteParent = (data, i, c, t) => {
		this.props.callbackFromAppWindowDeleteDir(data, i, c, t);
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
												setItemsForDelete={this.setItemsForDeleteParent} 
												callbackFromItemList={this.ItemListCallback}/>
									</li>);
	return (
		<ol>
			{dirElements}
		</ol>
	);

	}
}

export default ItemList;
