import React from 'react';
import store from 'store';
import { getMore } from 'api/data';
import SaveSearch from 'ui/saveSearch';

require("assets/styles/likesPage2.scss");


let i = 1

export default React.createClass({
	handleClick: function(e){
		e.preventDefault();
		var pageNum = Math.ceil(this.props.itemCount / 12);
		i += 1
		if(i <= pageNum){
			getMore(i, this.props.likes);
		} 
		console.log(pageNum);
		console.log(this.props.likes);

	},
	render: function(){
		return (
			<div>
			<div className="moreButton positionMoreButton" onClick={this.handleClick}>more</div>
			{this.props.showSearch ? <SaveSearch likes={this.props.likes} /> : ""} 
			</div>
		)
	}
})