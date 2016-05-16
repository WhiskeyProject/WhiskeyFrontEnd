	import React from 'react';
import store from 'store';
import { getLikes, getWhiskey, getSearches } from 'api/data';
import Suggestions from 'ui/suggestions';
import UserSearches from 'ui/userSearches';
import SearchInput from 'ui/searchInput';
import { Link } from 'react-router';
import LikeBoxItem from 'ui/likeBoxItem';

require("assets/styles/userPage.scss");
require('font-awesome-webpack');

export default React.createClass({
	getInitialState: function(){
		return {
			likedwhiskey: [],
			whiskeyItem: {},
			usersearches: [],
			comparables: [],
			show: false,
			highlight: ""
		}
	},
	componentWillMount: function(){
		getLikes();
		getSearches();
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				whiskeyItem: currentStore.whiskeyReducer.whiskeyItem,
				usersearches: currentStore.userReducer.usersearches,
				comparables: currentStore.whiskeyReducer.comparables,
				show: currentStore.showReducer.show,
				highlight: currentStore.userReducer.highlight

			})
		}.bind(this))
	},
	toggleHighlight: function(e){
		e.preventDefault();
		if(this.state.highlight === ""){
			store.dispatch({
				type: 'TOGGLE_HIGHLIGHT',
				highlight: "highlight"
			})
		} 
		else {
			store.dispatch({
				type: 'TOGGLE_HIGHLIGHT',
				highlight: ""
			})
		}
	},
	render: function(){
		return (
			<div className="bgImage">
				<header>
					<a href="#">Profile</a>
					<a href="#">Logout</a>
				</header>
				<div className="searchBar">
					<Link to="/likesPage"><div className="newSearchButton">Add New Search <i className="fa fa-arrow-right" aria-hidden="true"></i></div></Link>
					<p>Saved Searches</p>
					<UserSearches usersearches={this.state.usersearches}/>
				</div>
					<div className="likeBox">
						
						<div className="like">
							<span>Whiskeys I Like</span>
							<SearchInput />
						</div>
						<div className="heading"></div>
						<div className="products">

							{this.state.likedwhiskey.map(function(item, i){
								return (
									<LikeBoxItem item={item} i={i} onClick={this.toggleHighlight}/>
								)
							}.bind(this))}
						</div>
						<div className="shade"></div>
					</div>
					{this.state.show ? <Suggestions comparables={this.state.comparables} /> : ""}
			</div>
		)
	}
})