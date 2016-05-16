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
require('font-awesome-webpack');
var image = require("assets/images/darkerLogo.png");
var x = [];

export default React.createClass({
	getInitialState: function(){
		return ({
			showHeart: this.props.showHeart || false,
			likedwhiskey: [],
			showSearch: false
		})
	},
	
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				showSearch: currentStore.showReducer.showSearch
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
		

		// this.setState({
		// 	iDs: iDs
		// })
	},
	getStatus: function(item, ){
		this.getIDs();
		if(x.indexOf(item) === -1){
			return false;
		} else {
			return true;
		}
	},
	render: function(){
		return (
			<div>
			<div className="mainImage"><img src={image} /></div>
			<div className="resultsFlex">

			<div className="tempResults positionLikeBox">
				{this.props.tagSearch.map(function(item, i){
					
					return (
						<div className="itemsLayout" key={i}>
							<div className="itemImage">
								<img className="itemImage" src={item.img_url} />
								{this.getStatus(item.id) ? <LikeHeart item={item} /> : <NoHeart item={item} />}
							</div>
							<div className="itemDescription">
								<div className="titleDiv">{item.title}</div>
								<div>{item.region}</div> 
								<div className="priceColor">${item.price}</div>
								<StarRating rating={item.rating} />
							</div>
							<div className="choices">
								<a href="#"><div onClick={this.handleClick.bind(this, item)} className="choiceA"></div></a>
								<Link to={"/productDetailPage/" + item.id}><div className="choiceB">Product Details</div></Link>
							</div>
						</div>

					)
				}.bind(this))}
			</div>
			<div></div>
			<div>
				{this.props.showMoreButton ? <MoreButton likes={this.props.likes} itemCount={this.props.itemCount} showSearch={this.state.showSearch} /> : ""}
			</div>


			</div>
			</div>
			)
	}
})