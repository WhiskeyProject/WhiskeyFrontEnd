import React from 'react';
import store from 'store';
import { getTagSearch } from 'api/data';
import Item from 'ui/item';

require('assets/styles/likesPage.scss');

export default React.createClass({
	getInitialState: function(){
		return {
			showLikesSearch: false,
			tagSearch: [],
			likes: [],
			fruit:['apple','banana','cherry','citrus','fruity', 'lemon', 'orange', 'pear', 'raisins', 'zest' ],
			structure: ['balanced', 'complex', 'dry', 'earthy', 'heavy', 'light', 'lingering', 'mellow', 'mild', 'old', 'smooth'],
			food: ['barley', 'buttery', 'butterscotch', 'candy', 'chocolate', 'cinnamon', 'cocoa', 'corn', 'honey', 'tea', 'toffee'],
			items: ['clove', 'coffee', 'floral', 'licorice', 'malty', 'mint', 'nutmeg', 'peaty', 'peppery', 'roses', 'spices', 'sugar', 'tobacco', 'vanilla', 'wood', 'sherry'],
			general: ['bitter', 'brine', 'creamy', 'ginger', 'herbal', 'maple', 'nutty', 'oak', 'rich', 'salty', 'smokey', 'sour', 'spicy', 'sweet'],
			appearance: ['amber', 'brown', 'green', 'caramel', 'pale']
		}
	},
	toggleStatus: function(item,index, e){
		var val = item;
		var allLikes = this.state.likes;
		
		if(allLikes.indexOf(item)===-1){
			allLikes.push(item);
		} else {
			var arrIndex = allLikes.indexOf(item);
			allLikes.splice(arrIndex,1)
		}

		this.setState({
			likes: allLikes
		})
	},
	handleSubmit: function(e){
		e.preventDefault();
		var likesArr = this.state.likes;
		getTagSearch(this.state.likes);
		if(likesArr.length > 0) {
			store.dispatch({
			type: 'CHANGE_SHOWLIKESSEARCH',
			showLikesSearch: true
		})} else {
			store.dispatch({
			type: 'CHANGE_SHOWLIKESSEARCH',
			showLikesSearch: false
		})
		} 
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				tagSearch: currentStore.userReducer.tagSearch,
				showLikesSearch: currentStore.showReducer.showLikesSearch
			})
		}.bind(this))
		console.log(this.state.likes);
		console.log(this.state.showLikesSearch);	
	},
	
	render: function(){

		return (
			<div className="bgImage">
			<header></header>
			<div className="ask">Tell us what you like</div>
			<form className="categories" action="" method="post" onSubmit={this.handleSubmit}>
				<div className="allBoxes">
					<div className="fruits">
						<div className="title"></div>
							<div className="boxLeft">
								{this.state.fruit.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}	
							</div>
							<div className="divider"></div>
							<div className="boxRight">
								{this.state.structure.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}					
							</div>
					</div>
					<div className="fruits">
						<div className="title"></div>
							<div className="boxLeft">
								{this.state.food.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}
								
							</div>
							<div className="divider"></div>
							<div className="boxRight">					
								{this.state.items.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}
								
							</div>
					</div>
					<div className="fruits">
						<div className="title"></div>
							<div className="boxLeft">
								{this.state.general.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}
							</div>
							<div className="divider"></div>
							<div className="boxRight">					
								{this.state.appearance.map(function(item,i){
									return <div key={i}><input onClick={this.toggleStatus.bind(this, item, i)} type="checkbox"/>{item}</div>
								}.bind(this))}
							</div>
					</div>
				</div>
				<button className="tagButton" onSubmit={this.handleSubmit}>Search</button>
			</form>
			<div className="results">
				{this.state.showLikesSearch ? <Item tagSearch={this.state.tagSearch} showLikesSearch={this.state.showLikesSearch} likes={this.state.likes}/> : ""}

			</div>
			</div>
		)
	}
})