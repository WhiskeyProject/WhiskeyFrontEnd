import React from 'react';
import store from 'store';
import { changeFavorite } from 'api/data';

require("assets/styles/userPage.scss");
require('font-awesome-webpack');

export default React.createClass({
	// getDefaultProps: function(){
	// 	return ({
	// 		moveHeart: "",
	// 		moveOption: ""
	// 	})
	// },
	deleteLike: function(item, e){
		e.preventDefault();
		console.log('Item ID to be removed:', item.id);
		changeFavorite({
			whiskey_id: item.id,
			action: "remove",
			opinion: "like"
		})
	},
	render: function(){
		return (
			<i className="fa fa-heart" id={this.props.heartAttack} onClick={this.deleteLike.bind(this, this.props.item)}><span className="removeLike">Remove From Likes</span></i>
		)
	}
})