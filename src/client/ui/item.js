import React from 'react';
import store from 'store';
import SaveSearch from 'ui/saveSearch';
import { browserHistory } from 'react-router';

require("assets/styles/userPage.scss");

export default React.createClass({
	closeWindow: function(){
		store.dispatch({
			type: 'CHANGE_SHOWLIKESSEARCH',
			showLikesSearch: false
		})
	},	
	render: function(){
		return (
			<div className="likebox">
			<div className="like">
					<div>{this.props.likes}</div>
					<div><i onClick={this.closeWindow} className="fa fa-times fa-2x"></i></div>
				</div>
			<div className="searchResultsBox">
				
			{this.props.tagSearch.map(function(item){
				return (
					<div className="itemsLayout" key={item.id}>
						<div className="itemImage">
							<img className="itemImage" src={item.img_url} />
						</div>
						<div className="itemDescription">
							<h4>{item.title}</h4>
							<p>{item.region}</p>
						</div>
					</div>
				)
			})}
			</div>
			{this.props.showLikesSearch ? <SaveSearch likes={this.props.likes} /> : ""}

			</div>
		)
	}
})