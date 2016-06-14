import React from 'react';
import store from 'store';
import { changeFavorite } from 'api/data';

require("assets/styles/addFavorite.scss");

export default React.createClass({
	handleClick: function(e){
		e.preventDefault();
		changeFavorite({
			whiskey_id: this.props.id,
			action: "add",
			opinion: "like"
		})
	},
	render: function(){
		return (
			<div className="addFavoriteButton" onClick={this.handleClick}>Add To Favorites</div>
		)
	}
})