import React from 'react';
import store from 'store';
import { getLikes, getWhiskey, getSearches, changeFavorite } from 'api/data';
import Suggestions from 'ui/suggestions';
import UserSearches from 'ui/userSearches';
import SearchInput from 'ui/searchInput';
import { Link } from 'react-router';
import StarRating from 'ui/starRating';
import MoreButton from 'ui/moreButton';
import LikeHeart from 'ui/likeHeart';
import NoHeart from 'ui/noHeart';
import SaveSearch from 'ui/saveSearch';

require("assets/styles/userPage.scss");
require("assets/styles/likeBoxItem.scss")
require('font-awesome-webpack');
var image = require("assets/images/darkerLogo.png");
var x = [];

export default React.createClass({
	getInitialState: function(){
		return ({
			showHeart: this.props.showHeart || false,
			likedwhiskey: [],
			showSearch: false,
			showMoreButton: false
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				showSearch: currentStore.showReducer.showSearch,
				showMoreButton: currentStore.showReducer.showMoreButton
			})
		}.bind(this));
	},

	handleClick: function(item, e){
		e.preventDefault();
		e.stopPropagation();
		var clickId = item.id;
		getWhiskey(clickId);
			
		store.dispatch({
			type: 'CHANGE_SHOW',
			show: true
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: true
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCHITEM',
			showLikesSearch: false
		})
	},
	getIDs: function(){
		x = this.state.likedwhiskey.map(function(data){
			return data.id;
		})
	},
	getStatus: function(item){
		this.getIDs();
		if(x.indexOf(item) === -1){
			return false;
		} else {
			return true;
		}
	},
	onScroll: function(){
		window.onscroll = scrollFunction;
		


			function scrollFunction(){
				var scrollTest = document.getElementById('scrollTest');
				var contentHeight = scrollTest.offsetHeight;
				var yOffset = window.pageYOffset;
				var y = yOffset + window.innerHeight;
				
				if(y >= contentHeight){
					console.log("You're scrolling on in the LikeBox Component!!");
				}		
				
		}
	},
	render: function(){
		return (
			<div> 
				<div className="mainImage correctMargin"><img src={image} /></div>
				<div className="resultsFlex">

					<div className="tempResults positionLikeBox">
						{this.props.tagSearch.map(function(item, i){
							
							return (
								<div className="itemsLayout" key={i}>
								{this.getStatus(item.id) ? <LikeHeart item={item} /> : <NoHeart item={item} />}
									<Link to={"/productDetailPage/" + item.id}><div className="itemImageContainer">

										<img className="itemImage" src={item.list_img_url} />
										
									</div></Link>
									<div className="itemDescription">
										<div className="titleDiv">{item.title}</div>
										<div className="textCategorys">Type/Region: <span className="priceColor">{item.region}</span></div> 
										<div  className="textCategorys" >Avg Price: <span className="priceColor">${item.price}</span></div>
										<StarRating rating={item.rating} />
									</div>
									<div className="choices">
										<a href="#"><div onClick={this.handleClick.bind(this, item)} className="choiceA"></div></a>
										<Link to={"/productDetailPage/" + item.id}><div className="choiceB">Details and Suggestions</div></Link>
									</div>
								</div>

							)
						}.bind(this))}
						{this.state.showSearch ? <SaveSearch likes={this.props.likes} /> : ""}
					</div>
				
						{this.props.showMoreButton ? <MoreButton itemCount={this.props.itemCount} showSearch={this.state.showSearch} /> : ""}
						

				</div>
			</div>
			)
	}
})