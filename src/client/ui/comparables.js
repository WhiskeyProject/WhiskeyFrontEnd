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

require("assets/styles/productDetailPage.scss")
require("assets/styles/comparables.scss")
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

	getIDs: function(){
		x = this.state.likedwhiskey.map(function(data){
			return data.id;
		})
		

		// this.setState({
		// 	iDs: iDs
		// })
	},
	getStatus: function(item){
		this.getIDs();
		if(x.indexOf(item) === -1){
			return false;
		} else {
			return true;
		}
	},
	handleClick: function(item, e){
		e.preventDefault();
		getWhiskey(item.id);
	},
	componentWillUnmount: function(){
		this.unsubscribe();
	},
	render: function(){
		return (
			<div className="bigCompFlex prodDetailContainer">
			<div className="compFlex">

				{this.props.comparables.map(function(item, i){
					return (
						<div className="itemsLayout" key={item.id}>
						{this.getStatus(item.id) ? <LikeHeart item={item} /> : <NoHeart item={item} />}
							<Link to={"/productDetailPage/" + item.id}><div className="itemImageContainer">

								<img className="itemImage" src={item.list_img_url} />
								{console.log('Item', item.list_img_url)}
							</div></Link>
							<div className="itemDescription">
								<div className="titleDiv">{item.title}</div>
								<div className="textCategorys">Type/Region: <span className="priceColor">{item.region}</span></div> 
								<div  className="textCategorys" >Avg Price: <span className="priceColor">${item.price}</span></div>
								<StarRating rating={item.rating} />
							</div>
							<div className="choices">
								<Link to={"/productDetailPage/" + item.id}><div onClick={this.handleClick.bind(this, item)} className="choiceB">Details and Suggestions</div></Link>
							</div>
						</div>

					)
				}.bind(this))}
			</div>
			</div>
		)
	}
})