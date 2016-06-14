import React from 'react';
import store from 'store';
import { getTagSearch, getLikes, getGeneralSearch, logout, getAllResults } from 'api/data';
import StarRating from 'ui/starRating';
import SearchInput from 'ui/searchInput';
import LikeBoxItem from 'ui/likeBoxItem';
import SaveSearch from 'ui/saveSearch';
import HeaderComponent from 'ui/headerComponent';
import { Link, browserHistory } from 'react-router';
import TagFilterComponent from 'ui/tagFilterComponent';

require('assets/styles/likesPage2.scss');
var image = require("assets/images/darkerLogo.png");
require('font-awesome-webpack');



export default React.createClass({
	getInitialState: function(){
		return {
			showSearch: false,
			showLikesSearch: false,
			showMoreButton: false,
			itemCount: 0,
			tagSearch: [],
			tagLikes: [],
			priceLikes: [],
			regionLikes: [],
			fruit:['bitter','brine', 'buttery', 'clove', 'coffee', 'corn', 'creamy', 'ginger', 'maple', 'nutmeg', 'nutty', 'salty', 'sherry', 'spices', 'tea',],
			structure: ['balanced', 'barley', 'complex', 'dry', 'earthy', 'floral', 'green', 'heavy', 'herbal', 'light', 'malty', 'mellow', 'mild', 'oak', 'old', 'peaty', 'peppery', 'rich', 'roses', 'smokey', 'smooth', 'sour', 'spicy', 'sweet', 'tobacco', 'wood'],
			region: ['island', 'rye', 'campbeltown', 'japan', 'bourbon', 'highland', 'american', 'irish', 'speyside', 'islay', 'other'],
			items: ['apple', 'banana', 'cherry', 'citrus', 'fruity', 'lemon', 'orange', 'pear', 'raisins', 'zest'],
			general: ['butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'honey', 'licorice', 'mint', 'sugar', 'toffee', 'vanilla'],
			appearance: ['amber', 'brown', 'caramel', 'pale'],
			price: ['$', '$$', '$$$'],
			proof: ['A little', 'A lot', 'Way too much'],
			likedwhiskey: [],
			startBox: true,
			likes: []
		}	
	},
	updateState: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey,
				likes: currentStore.whiskeyReducer.likes
			})
		}.bind(this))
	} ,
	componentWillMount: function(){
		this.updateState();
	},
	pushTags: function(item, index, e, tags, cb){
		this.startBoxStatus();
		
		if(tags.indexOf(item)===-1){
			tags.push(item);
		} else {
			var arrIndex = tags.indexOf(item);
			tags.splice(arrIndex,1)
		}
		
		cb(tags);
		
		this.sendAllResults();
	},
	getTags: function(item,index, e){
		this.startBoxStatus();
		var tags = this.state.tagLikes;
		this.pushTags(item, index, e, tags, function(resp){
			this.setState({
				tagLikes: resp
			})
		}.bind(this));		
	},
	getRegion: function(item, index, e){
		this.startBoxStatus();
		var tags = this.state.regionLikes;
		this.pushTags(item, index, e, tags, function(resp){
			this.setState({
				regionLikes: resp
			})
		}.bind(this));	
	},
	
	getPrice: function(item, index, e){
		this.startBoxStatus();
		var tags = this.state.priceLikes;
		this.pushTags(item, index, e, tags, function(resp){
			this.setState({
				priceLikes: resp
			})
		}.bind(this));	
	},
	sendAllResults: function(){
		var searchObj = {
			tag: this.state.tagLikes,
			price: this.state.priceLikes,
			region: this.state.regionLikes
		}
		getAllResults(searchObj);
		
		var tagLength = this.state.tagLikes;
		var priceLength = this.state.priceLikes;
		var regionLength = this.state.regionLikes;
		
		if(tagLength.length > 0 || priceLength.length > 0 || regionLength.length > 0) {
			store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: true
			})
		} else {
			store.dispatch({
				type: 'CHANGE_SHOWSEARCH',
				showSearch: false
			})
		}	

		getLikes();	
		
		this.updateState();
	},
	startBoxStatus: function(){
		this.setState({
			startBox: false
		})
	},
	componentWillUnmount: function(){
		this.unsubscribe;
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})
		store.dispatch({
			type: 'CHANGE_SHOWMOREBUTTON',
			showMoreButton: false
		})
	},
	searchFirst: function(str){
		getGeneralSearch(str);

		this.updateState();
	},
	userLogout: function(){
		logout();
		browserHistory.push('/landingPage3');
	},
	render: function(){
		return (
			<div className="bodyDiv">
			
			
				<HeaderComponent 
					page1={''} link1={''}
					page2={'/originalContentPage'} link2={'General Info'} 
					page3={'/userPage2'} link3={'Profile'}	
				/>
				
				
				<div className="container">
				
					<div className="navheader">
						<div className="whatYouLike">Now, tell us what you like...</div>
						<div className="newSaveBox">
							{this.props.showSearch ? <SaveSearch likes={this.props.likes} /> : ""} 
						</div>
						<div className="centerSearchInput">
							<SearchInput searchFirst={this.searchFirst} startBoxStatus={this.startBoxStatus}/>
						</div>
					</div>

					
					<div className="bigFlex">
						
						<form action="" method="post" onSubmit={this.handleSubmit}>
							<div className="barrelBarFlex">
								<TagFilterComponent group={this.state.region} getResults={this.getRegion} category={"Region"}/>
								<TagFilterComponent group={this.state.items} getResults={this.getTags} category={"Fruit"}/>
								<TagFilterComponent group={this.state.general} getResults={this.getTags} category={"Sweet"}/>
								<TagFilterComponent group={this.state.fruit} getResults={this.getTags} category={"Notes"}/>
								<TagFilterComponent group={this.state.appearance} getResults={this.getTags} category={"Appearance"}/>
								<TagFilterComponent group={this.state.price} getResults={this.getPrice} category={"Price"}/>
							</div>
						</form>
					
						<LikeBoxItem 
							likedwhiskey={this.state.likedwhiskey} 
							tagSearch={this.state.tagSearch} 
							showMoreButton={this.state.showMoreButton} 
							itemCount={this.state.itemCount} 
							likes={this.state.likes}
						/>

						{this.state.startBox ? <div className="startBox"><i className="fa fa-arrow-left" aria-hidden="true"></i> Start Your Search Here</div> : ""}			
						
					</div>

				</div>

			</div>
		)
	}
})