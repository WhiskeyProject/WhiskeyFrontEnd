import React from 'react';
import store from 'store';
import { getSearches, getTagSearch } from 'api/data';
import SavedSearchList from 'ui/savedSearchList';
import LikeBoxItem from 'ui/likeBoxItem';

require("assets/styles/userSearches.scss");

export default React.createClass({
	getInitialState: function(){
		return {
			tagSearch: [],
			showSearch: false,
			searchTitle: ""
		}	
	},
	handleClick: function(item, e){
		e.stopPropagation();
		// console.log(item.search_string);
		var searchString = item.search_string;
		var searchTitle = item.title;
		getTagSearch(searchString);
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})
		store.dispatch({
			type: 'CHANGE_SHOW',
			show: false
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCHITEM',
			showSearchItem: true
		})
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();

			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showSearchItem: currentStore.showReducer.showSearch,
				searchTitle: searchTitle
			})
		}.bind(this))

	},
	

	render: function(){
		return (
			<div>

				{this.props.usersearches.map(function(item, i){
					return (
						<div className="searchBoxes" key={item.id} onClick={this.handleClick.bind(this, item)}>
						{item.title} 	
						</div>
					)
				}.bind(this))}
			</div>
		)
	}
})