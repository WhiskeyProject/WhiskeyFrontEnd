import React from 'react';
import store from 'store';
import { getMore } from 'api/data';
import SaveSearch from 'ui/saveSearch';

require("assets/styles/likesPage2.scss");


let i = 1

export default React.createClass({

	getInitialState: function(){
		return {
			likes: ""
		}
	},
	componentDidMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likes: currentStore.whiskeyReducer.likes
			})
		}.bind(this));
	},
	handleClick: function(e){
		e.preventDefault();
		
		var pageNum = Math.ceil(this.props.itemCount / 12);
		i += 1
		if(i < pageNum){
			getMore(i, this.state.likes);
		} else {
			getMore(i, this.state.likes);
			store.dispatch({
				type: 'CHANGE_SHOWMOREBUTTON',
				showMoreButton: false
			})
		}
		
		// console.log("Page Numbers", pageNum);
		// console.log('More Button State of likes:', this.state.likes);

	},
	componentWillUnmount: function(){
		this.unsubscribe();
	},
	render: function(){
		return (
			<div>
				<div className="moreButton positionMoreButton" onClick={this.handleClick}>more</div>
			</div>
		)
	}
})