import React from 'react';
import store from 'store';
import { getWhiskey, getLikes, logout } from 'api/data';
import StarRating from 'ui/starRating';
import { Link, browserHistory } from 'react-router';
import Comparables from 'ui/comparables';
import Reviews from 'ui/reviews';
import ReviewForm from 'ui/reviewForm';
import AddFavorite from 'ui/addFavorite';
import LikeHeart from 'ui/likeHeart';
import NoHeart from 'ui/noHeart';
import HeaderComponent from 'ui/headerComponent';


require("assets/styles/productDetailPage.scss")
var image = require("assets/images/darkerLogo.png");
var x = [];

export default React.createClass({
	getInitialState: function(){
		return {
			whiskeyItem: {},
			comparables: [],
			tags: [],
			reviews: [],
			likedwhiskey: []
		}
	},
	componentWillMount: function(){
		getLikes();
		getWhiskey(this.props.params.id);
		
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				whiskeyItem: currentStore.whiskeyReducer.whiskeyItem,
				comparables: currentStore.whiskeyReducer.comparables,
				tags: currentStore.whiskeyReducer.tags,
				reviews: currentStore.whiskeyReducer.reviews,
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				moveHeart: "moveHeart",
				moveOption: "moveOption",
				heartAttack: "heartAttack",
				heartAttackSpan: "heartAttackSpan"

			});
			
		}.bind(this))
	},
	handleClick: function(e){
		e.preventDefault();
	},
	userLogout: function(){
		logout();
		browserHistory.push('/landingPage3');
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

	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function(){
		return (
			<div className="bgImage">

				<HeaderComponent 
					page1={'/likesPage2'} link1={'General Search'}
					page2={'/originalContentPage'} link2={'General Info'} 
					page3={'/userPage2'} link3={'Profile'}	
				/>

				<div className="container">
				<div className="mainImage productDetailBg"><img src={image} /></div>
					<div className="productFlex  prodDetailContainer">
						<div className="imageDetailBox">
							<div className="detailImage"><img src={this.state.whiskeyItem.detail_img_url} /></div>
							{this.getStatus(this.state.whiskeyItem.id) ? <LikeHeart item={this.state.whiskeyItem} moveHeart={this.state.moveheart} moveOption={this.state.moveOption} heartAttack={this.state.heartAttack} heartAttackSpan={this.state.heartAttackSpan} /> : <NoHeart item={this.state.whiskeyItem} moveHeart={this.state.moveheart} moveOption={this.state.moveOption}  heartAttack={this.state.heartAttack} heartAttackSpan={this.state.heartAttackSpan} />}
							<div className="avgPrice">Average Price: <span className="priceColor priceSize">${this.state.whiskeyItem.price}</span></div>
							<StarRating rating={this.state.whiskeyItem.rating} />
							
							{/* <AddFavorite id={this.state.whiskeyItem.id} /> */}
						</div>
						<div className="titleDetailBox">
							<div className="prodTitle">{this.state.whiskeyItem.title}</div>
							<div className="avgPrice">Type/Region:</div>
							<div className="prodRegion">{this.state.whiskeyItem.region}</div>
							<div className="cheatDiv"></div>
							<div className="avgPrice">Description:</div>
							<div className="prodDescription">{this.state.whiskeyItem.description}</div>
							<div className="avgPrice">Attributes:</div>
							<div className="prodTags"> 
							{this.state.tags.map(function(item, i){
								return (
								<span key={i} className="addComma"> {item.title}, </span>
								)
							})}
							</div>
						</div>
					</div>
					<div className="suggestions prodDetailContainer">Suggestions based on {this.state.whiskeyItem.title}</div>
					<Comparables comparables={this.state.comparables} />
					<div className="leaveReview prodDetailContainer">leave a Review</div>
					<ReviewForm id={this.state.whiskeyItem.id} />
					<Reviews reviews={this.state.reviews} />

				</div>
			</div>
		)
	}
})