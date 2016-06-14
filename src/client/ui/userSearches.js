import React from 'react';
import store from 'store';
import { getSearches, getTagSearch, deleteUserSearchBox } from 'api/data';
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
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showSearchItem: currentStore.showReducer.showSearch,
				usersearches: currentStore.userReducer.usersearches
			});
		}.bind(this))
	},
	handleClick: function(item, e){
		e.stopPropagation();
		console.log(item.search_string);
		this.props.getDivTitle(item.title);
		var searchString = item.search_string;
		var searchTitle = item.title;
		getTagSearch(searchString);
		store.dispatch({
			type: 'CHANGE_SHOWMOREBUTTON',
			showMoreButton: true
		})
		store.dispatch({
			type: 'GET_LIKETAGS',
			likes: searchString
		})
		console.log('after dispatch', searchString);
		// store.dispatch({
		// 	type: 'CHANGE_SHOWSEARCHITEM',
		// 	showSearchItem: true
		// })
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();

			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showSearchItem: currentStore.showReducer.showSearch,
				searchTitle: searchTitle
			});
		}.bind(this))
		this.props.showLikeButton();

	},
	deleteSaveBox: function(item, e){
		e.preventDefault();         // Call to attach to icon    
		deleteUserSearchBox(item.id);
		this.props.updateSearches();
	},
	componentWillUnmount: function(){
		this.unsubscribe();
	},
	render: function(){
		return (
			<div>

				{this.props.usersearches.map(function(item, i){
					return (
						<div>
							<div className="searchBoxes" key={i} onClick={this.handleClick.bind(this, item)}>{item.title} </div>
							<div onClick={this.deleteSaveBox.bind(this, item)} className="deleteBox"><i className="fa fa-trash" aria-hidden="true"></i>
							</div>
						</div>
						
					)
				}.bind(this))}
			</div>
		)
	}
})