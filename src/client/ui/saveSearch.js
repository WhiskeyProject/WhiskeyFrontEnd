import React from 'react';
import store from 'store';
import { postSavedSearch } from 'api/data';
import { Link, browserHistory } from 'react-router';

require("assets/styles/saveSearch.scss");


export default React.createClass({
	getInitialState: function(){
		return ({
			title: "", 
			search_string: "",
			likes: ""
		})	
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				likes: currentStore.whiskeyReducer.likes
			})
		}.bind(this));

	},
	handleChange: function(e){
		this.setState({
			title: this.refs.title.value
		})
			
	},
	handleSubmit: function(e){
		e.preventDefault();

		// var arrToString = this.props.likes;
		// arrToString = arrToString.toString();
		var searchObj = {
			title: this.state.title,	
			search_string: this.props.likes 
		}
		// console.log(this.props.likeParams);
		// console.log('Saved Search_String:', searchObj);

		postSavedSearch(searchObj);
		
		this.setState({
			title: ""
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})

	},
	componentWillUnmount: function(){
		this.unsubscribe();
	},
	render: function(){
		return (

			<div className="saveSearchOption2">
				<form onSubmit={this.handleSubmit}>
					<input ref="title" type="text" name="saveSearch" onChange={this.handleChange} value={this.state.title} placeholder="Enter Search Title"/>
					<button type="submit" className="saveSearchText">save this search</button>
				</form>
			</div>
		)
	}
})