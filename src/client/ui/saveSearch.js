import React from 'react';
import store from 'store';
import { postSavedSearch } from 'api/data';
import { Link, browserHistory } from 'react-router';

require("assets/styles/userPage.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			title: "", 
			search_string: ""
		})
		
	},
	handleChange: function(e){
		this.setState({
			title: this.refs.title.value
		})
			
	},
	handleSubmit: function(e){
		e.preventDefault();
		var arrToString = this.props.likes;
		arrToString = arrToString.toString();
		var searchObj = {
			title: this.state.title,
			search_string: arrToString 
		}
		console.log(this.props.likes);
		console.log(searchObj);
		postSavedSearch(searchObj);
		
		this.setState({
			title: ""
		})
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})

	},
	render: function(){
		return (
			<div className="saveSearchOption2 positionSaveBar">
				<form onSubmit={this.handleSubmit} className="saveSearchFormFlex2">
					<input ref="title" type="text" name="saveSearch" onChange={this.handleChange} value={this.state.title} placeholder="Enter Search Title"/>
					<button type="submit" className="saveSearchText">save this search</button>
				</form>
			</div>
		)
	}
})