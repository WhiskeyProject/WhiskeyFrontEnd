
import React from 'react';
import store from 'store';
import { getLikes, getWhiskey, getSearches, logout } from 'api/data';
import Suggestions from 'ui/suggestions';
import UserSearches from 'ui/userSearches';
import SearchInput from 'ui/searchInput';
import { Link, browserHistory } from 'react-router';
import LikeBoxItem from 'ui/likeBoxItem';
import HeaderComponent from 'ui/headerComponent';

require("assets/styles/userPage2.scss");
require('font-awesome-webpack');
var image = require("assets/images/darkerLogo.png");

export default React.createClass({
	getInitialState: function(){
		return {
			likedwhiskey: [],
			whiskeyItem: {},
			usersearches: [],
			show: false,
			showHeart: true,
			showLikesSearch: true,
			containerInfo: [],
			showMoreButton: false,
			likes: [],
			itemCount: 0,
			titleDiv: "Your Liked List",
			titleDescription: "Liked",
			showBackToLikes: false
		}
	},
	getDivTitle: function(title, str){
		this.setState({
			titleDiv: "Your '" + title + "' search...",
			titleDescription: str
		})
	},
	componentDidMount: function(){
		getLikes();
		getSearches();
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				whiskeyItem: currentStore.whiskeyReducer.whiskeyItem,
				usersearches: currentStore.userReducer.usersearches,
				show: currentStore.showReducer.show,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				containerInfo: currentStore.userReducer.containerInfo,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likes: currentStore.whiskeyReducer.likes,
				itemCount: currentStore.userReducer.itemCount

			})
		}.bind(this))


	},
	goBack: function(){
		getLikes();
		this.setState({
			titleDiv: "Your Liked List",
			showBackToLikes: false
		})
		store.dispatch({
			type: 'CHANGE_SHOWMOREBUTTON',
			showMoreButton: false
		})

	},
	
	showLikeButton: function(){
		this.setState({
			showBackToLikes: true
		})
	},
	updateSearches: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				usersearches: currentStore.userReducer.usersearches
			})
		}.bind(this))
	},
	startBoxStatus: function(){
		this.setState({
			startBox: false
		})
	},
	componentWillUnmount: function(){
		this.unsubscribe();
	},
	userLogout: function(){
		logout();
		browserHistory.push('/landingPage3');
	},

	render: function(){
		return (
			<div className="bgImage">
				
				<HeaderComponent
					page1={''} link1={''} 
					page2={'/originalContentPage'} link2={'General Info'} 
					page3={'/likesPage2'} link3={'General Search'}
				/>

				
				<div className="container">

					<div className="navheader">
						<div className="whatYouLike">{this.state.titleDiv}</div>
						<div className="centerSearchInput">
							<SearchInput getDivTitle={this.getDivTitle} showLikeButton={this.showLikeButton} startBoxStatus={this.startBoxStatus} />
						</div>
					</div>
					
					<div className="pickStuff"></div>
					<div className="userPageBigBox">
						<div className="userSearchSave">
							<p>Saved Searches</p>
								<div className="userSearchBox">
									<UserSearches getDivTitle={this.getDivTitle} usersearches={this.state.usersearches} showLikeButton={this.showLikeButton} updateSearches={this.updateSearches} />
								</div>
							{this.state.showBackToLikes ? <a href="#"><div className="backToLikes" onClick={this.goBack} >Back to Likes</div></a> : ""}
						</div>
						
						<LikeBoxItem tagSearch={this.state.containerInfo} likedwhiskey={this.state.likedwhiskey} showMoreButton={this.state.showMoreButton} likes={this.state.likes} itemCount={this.state.itemCount} /> 
						
					</div>
				</div>

			</div>
		)
	}
})