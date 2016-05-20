import React from 'react';
import store from 'store';
import { getTagSearch, getLikes, getGeneralSearch, logout } from 'api/data';
import Item from 'ui/item';
import StarRating from 'ui/starRating';
import SearchInput from 'ui/searchInput';
import LikeBoxItem from 'ui/likeBoxItem';
import SaveSearch from 'ui/saveSearch';
import { Link, browserHistory } from 'react-router';

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
			likes: [],
			fruit:['bitter','brine', 'buttery', 'clove', 'coffee', 'corn', 'creamy', 'ginger', 'maple', 'nutmeg', 'nutty', 'salty', 'sherry', 'spices', 'tea',],
			structure: ['balanced', 'barley', 'complex', 'dry', 'earthy', 'floral', 'green', 'heavy', 'herbal', 'light', 'malty', 'mellow', 'mild', 'oak', 'old', 'peaty', 'peppery', 'rich', 'roses', 'smokey', 'smooth', 'sour', 'spicy', 'sweet', 'tobacco', 'wood'],
			food: ['barley', 'buttery', 'butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'corn', 'honey', 'tea', 'toffee'],
			items: ['apple', 'banana', 'cherry', 'citrus', 'fruity', 'lemon', 'orange', 'pear', 'raisins', 'zest'],
			general: ['butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'honey', 'licorice', 'mint', 'sugar', 'toffee', 'vanilla'],
			appearance: ['amber', 'brown', 'caramel', 'pale'],
			price: ['$', '$$', '$$$'],
			proof: ['A little', 'A lot', 'Way too much'],
			likedwhiskey: [],
			startBox: true
		}	
	},
	// componentWillmount: function(){
	// 	this.unsubscribe = store.subscribe(function(){
	// 		var currentStore = store.getState();
	// 		this.setState({
	// 			showSearch: currentStore.showReducer.showSearch
	// 		})
	// 	})
	// },
	toggleStatus: function(item,index, e){
		this.setState({
			startBox: false
		})
		var val = item;
		var allLikes = this.state.likes;
		console.log('value:', this.refs.price.value);
		if(allLikes.indexOf(item)===-1){
			allLikes.push(item);
		} else {
			var arrIndex = allLikes.indexOf(item);
			allLikes.splice(arrIndex,1)
		}
		console.log(allLikes);
		getTagSearch(allLikes);

		store.dispatch({
			type: 'GET_LIKETAGS',
			likes: allLikes
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: true
		})
		getLikes();	
		
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				likes: currentStore.whiskeyReducer.likes,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey
			})
		}.bind(this))
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
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				showSearch: currentStore.showReducer.showSearch,
				tagSearch: currentStore.userReducer.tagSearch,
				itemCount: currentStore.userReducer.itemCount,
				showLikesSearch: currentStore.showReducer.showLikesSearch,
				likes: currentStore.whiskeyReducer.likes,
				showMoreButton: currentStore.showReducer.showMoreButton,
				likedwhiskey: currentStore.userReducer.likedwhiskey
			})
		}.bind(this))

	},
	userLogout: function(){
		logout();
		browserHistory.push('/landingPage3');
	},
	render: function(){
		return (
			<div className="bgImage">
				{this.state.startBox ? <div className="startBox"><i className="fa fa-arrow-left" aria-hidden="true"></i> Start Your Search Here</div> : ""}
				<header className="carryLogo">
					<div className="headerFlex">
					<div className="logoDiv">
						<Link to="/landingPage3"><img src={image} /></Link>
					</div>
					<div className="headerLinks">
						<Link to="/originalContentPage">General Info</Link>
						<Link to="/userPage2">Profile</Link>
						<a href="#" onClick={this.userLogout}>Logout</a>
					</div>
					</div>
				</header>
			<div className="barrelBg">
			<div className="container">
				
				<div className="navheader">
					<div className="whatYouLike">Now, tell us what you like...</div>
					<div className="centerSearchInput">
						<SearchInput searchFirst={this.searchFirst}/>
					</div>

				</div>

				<div className="pickStuff"></div>
				<div className="bigFlex">
				<div className="formContainer">
				<form className="categories" id="categories" action="" method="post" onSubmit={this.handleSubmit}>
				<div className="barrelBarFlex">
				
					
					{/*}
					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Nose</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.food.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>
					*/}
					

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Structure</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.structure.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Fruit</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.items.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Sweet</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.general.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>	
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Notes</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.fruit.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>
					
					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Appearance</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.appearance.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Price</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.price.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox" ref="price" value={"?price=" + item} />{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

					<div className="tasteCategoryBox">
					<details open>
						<summary className="barrelBar topRounded">Proof</summary>
						<div className="barrelPopUp bottomRounded">
							{this.state.proof.map(function(item,i){
							return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
							}.bind(this))}	
						</div>
					</details>
					</div>

				</div>
				


				</form>
				</div>
					
					<LikeBoxItem likedwhiskey={this.state.likedwhiskey} tagSearch={this.state.tagSearch} showMoreButton={this.state.showMoreButton} likes={this.state.likes} itemCount={this.state.itemCount} />
					{/* {this.state.showSearch ? <LikeBoxItem likedwhiskey={this.state.likedwhiskey} tagSearch={this.state.tagSearch} showMoreButton={this.state.showMoreButton} likes={this.state.likes} itemCount={this.state.itemCount} /> : ""}  */}

				
				{/* {this.state.showLikesSearch ? <Item tagSearch={this.state.tagSearch} showLikesSearch={this.state.showLikesSearch} likes={this.state.likes}/> : ""} */}
			
					
				</div>	
			</div>
			</div>
			</div>
		)
	}
})