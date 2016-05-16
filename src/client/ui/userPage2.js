	import React from 'react';
import store from 'store';
import { getLikes, getWhiskey, getSearches } from 'api/data';
import Suggestions from 'ui/suggestions';
import UserSearches from 'ui/userSearches';
import SearchInput from 'ui/searchInput';
import { Link } from 'react-router';
import LikeBoxItem from 'ui/likeBoxItem';

require("assets/styles/userPage2.scss");
require('font-awesome-webpack');
var image = require("assets/images/darkerLogo.png");

export default React.createClass({
	getInitialState: function(){
		return {
			likedwhiskey: [],
			whiskeyItem: {},
			usersearches: [],
			comparables: [],
			show: false,
			showHeart: true,
			showLikesSearch: true
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
				showLikesSearch: currentStore.showReducer.showLikesSearch

			})
		}.bind(this))


	},

	render: function(){
		return (
			<div className="bgImage">
				<header className="carryLogo">
					<div className="logoDiv">
						<Link to="/landingPage3"><img src={image} /></Link>
					</div>
					<div className="headerLinks">
						<Link to="/likesPage2">Search</Link>
						<Link to="/landingPage3">Logout</Link>
					</div>
				</header>
				<div className="userPageContainer">
				<div className="userSearchSave">
				<Link to="/likesPage2"><div className="newSearchButton">Add New Search <i className="fa fa-arrow-right" aria-hidden="true"></i></div></Link>
					<p>Saved Searches</p>
					<UserSearches usersearches={this.state.usersearches}/>
				</div>
					
				
					<div className="likeBoxItemBox">
						<LikeBoxItem tagSearch={this.state.likedwhiskey} likedwhiskey={this.state.likedwhiskey} /> 
					</div>
				
						
					<div>
					{this.state.show ? <Suggestions comparables={this.state.comparables} /> : ""}
					</div>
				</div>
			</div>
		)
	}
})