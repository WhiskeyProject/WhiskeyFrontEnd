import React from 'react';
import store from 'store';
import { getGeneralSearch } from 'api/data';
import SearchItem from 'ui/searchItem';
import LikeBoxItem from 'ui/likeBoxItem';

require("assets/styles/userPage.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			tagSearch: [],
			showSearchItem: false,
			searchTag: ""
		})
		
	},
	handleChange: function(){
		this.setState({
			searchTag: this.refs.searchTag.value
		})
	},
	handleSubmit: function(e){
		e.preventDefault();
		getGeneralSearch(this.state.searchTag);
		store.dispatch({
			type: 'CHANGE_SHOWSEARCHITEM',
			showSearchItem: true
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})
		store.dispatch({
			type: 'CHANGE_SHOW',
			show: false
		})
		
		// store.dispatch({
		// 	type: 'GET_LIKETAGS',
		// 	likes: []
		// })
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showSearchItem: currentStore.showReducer.showSearchItem,
				searchTag: this.state.searchTag
			})
		}.bind(this))
		
		// console.log('tagSearch after submit', this.state.tagSearch);
	},
	render: function(){
		return (
			<div>
				<form className="searchField" onSubmit={this.handleSubmit}>
					<input type="search" ref="searchTag" placeholder="Search" onChange={this.handleChange} name="searchTag" value={this.state.searchTag} />
				</form>
				
					
			
			</div>
		)
	}
})