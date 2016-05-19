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


require("assets/styles/originalContent.scss")
var image = require("assets/images/BuffaloBarrels.jpg");
var logoImage = require("assets/images/darkerLogo.png");
var mapImage = require("assets/images/whiskeyWorld.jpg");

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
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function(){
		return (
			<div className="bgImage">
				<header className="carryLogo">
					<div className="headerFlex">
					<div className="logoDiv">
						<Link to="/landingPage3"><img src={logoImage} /></Link>
					</div>
					<div className="headerLinks">
						<Link to="/likesPage2">New Search</Link>
						<Link to="/userPage2">Profile</Link>
						<a href="#" onClick={this.userLogout}>Logout</a>
					</div>
					</div>
				</header>
				<div className="container">
				<div className="mainImage productDetailBg"><img src={logoImage} /></div>
					<div className="whiskeyContent">
						<div className="bigContentFlex">
							<div className="flex1">
								<img className="whiskeyImage" src={image} />
							</div>
							<div className="flex2">
								<div className="originalTextTitle">Whiskey Facts...</div>
								<div className="originalText">There are a lot of misconceptions about how whiskey is made and what distinguishes the different types. This page will help you understand the different types of whiskey and why the heck whiskey is spelled with and without an 'e'.</div>
								<div className="originalText">Whiskey starts out a lot like beer. Grains are mixed together (called a mash) and then fermented. The product is then aged and filtered. The mixture of grains used and the aging process are most of what give a whiskey it's own unique flavor. Food coloring is used surprisingly often, although some types of whiskey expressly disallow it.</div>
								<div className="originalText">Moonshine and white whiskey are essentially whiskey without the aging process. This is much faster and cheaper to produce but generally comes with a harsher taste.</div>
							</div>
						</div>	
							<div className="clearFloats"></div>
							<div><img className="whiskeyMapImage" src={mapImage} /></div>
							<div className="originalText">Whiskey types are largely based around regions. Distilling is a constantly evolving craft with a great and varied history. Different regions have developed their own unique methods. Some regions impose strict laws on how whiskey is produced, others have guidelines that may or may not be followed.</div>
							<div className="originalText">The word 'whiskey' or 'whisky' comes from the Gaelic uisce beatha, meaning water of life. The difference in spelling is generally determined by regional custom. Scotland and Canada use 'whisky' while the US and Ireland go with 'whiskey'. There is no hard and fast rule governing this and distillers are free to spell it how they like.</div>
							<div className="originalText">Scotch is produced in, you guessed it, Scotland. For a sprit to be deemed Scotch whisky, a distillery has to produce it in a manner specified by law. In order to be labeled as Scotch the whiskey must be produced entirely in Scotland and aged for at least three years. There are different regions such as The Highlands or Islay, each with it's own unique character. Scotch has a unique flavor that many whiskey drinkers either love or hate.</div>
							<div className="originalText">Surprisingly, there are only 12 distilleries currently operating in Ireland, some of which are so recently established, their spirits have not been aged long enough to be sold as whiskey. Of it's longer standing distilleries however, Ireland has some of the largest in the world.</div>
							<div className="originalText">Many believe that bourbon can only truly be made in Kentucky. Although 95% of it is, it is not a requirement; the only regional requirement for Bourbon is that it is produced in the United States. The mash must be made from at least 51% corn. The taste is generally smoother and sweeter than some other types of whiskey. This is a good place to start for newer whiskey drinkers. Straight bourbon must be aged for at least two years and can not contain food coloring.</div>
							<div className="originalText">Tennessee whiskey is just like straight bourbon except that it's made in Tennessee and undergoes and extra charcoal filtration process known as the Lincoln County Process.</div>
							<div className="originalText">Rye whiskeys are common in both the US and Canada but use a very different process in each place. In the US ryes are legally required to be made from at least 51% rye grain. Straight ryes, just like straight bourbon, must be aged for at least two years and can not have any food coloring added. Canada, on the other hand, only requires that rye whiskey contain rye, the amount does not matter. It's perfectly fine for a Canadian rye whiskey to be made with almost no rye. Rye whiskies are commonly characterized as having more spice and pepper than some other styles. They were extremely common in the early days of the United States but were largely replaced by the smoother complexion of bourbon after prohibition. Rye whiskey has seen a recent resurgence in popularity in the US, particularly through the growth of micro distilleries.</div>
						</div>
					</div>
				</div>
			
		)
	}
})