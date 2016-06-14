import React from 'react';
import store from 'store';
import { getGeneralSearch } from 'api/data';
import SearchItem from 'ui/searchItem';
import LikeBoxItem from 'ui/likeBoxItem';

require("assets/styles/userPage.scss");
require("assets/styles/searchInput.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			tagSearch: [],
			showSearchItem: false,
			searchTag: ""
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showSearchItem: currentStore.showReducer.showSearchItem,
				searchTag: currentStore.whiskeyReducer.searchTag
			})
		}.bind(this))
	},
	handleChange: function(){
		this.setState({
			searchTag: this.refs.searchTag.value
		})
	},
	handleSubmit: function(e){
		e.preventDefault();

		this.props.startBoxStatus();

		getGeneralSearch(this.state.searchTag);
		this.props.searchFirst(this.state.searchTag);
		this.props.getDivTitle(this.state.searchTag, "You searched for ");
		// store.dispatch({
		// 	type: 'CHANGE_SHOWSEARCH',
		// 	showSearch: true
		// })
		store.dispatch({
			type: 'CLEAR_SEARCHTAG',
			searchTag: ""
		})
		this.props.showLikeButton();

	},
	

	render: function(){
		return (
			<div className="searchInputDiv">
				<form id="searchField" onSubmit={this.handleSubmit}>
					<i className="fa fa-search" onClick={this.handleSubmit}></i>

					<input type="search" ref="searchTag" placeholder="Search" onChange={this.handleChange} name="searchTag" value={this.state.searchTag} />
					<button id="searchFieldButton" type="submit">Search</button>
				</form>
			</div>
		)
	}
})