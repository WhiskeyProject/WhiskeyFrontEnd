import React from 'react';
import store from 'store';
import SaveSearch from 'ui/saveSearch';
import { Link } from 'react-router';
// import { getWhiskey } from 'api/data';

require("assets/styles/savedSearchList.scss");
require('font-awesome-webpack');

export default React.createClass({
	closeWindow: function(){
		store.dispatch({
			type: 'CHANGE_SHOWSEARCH',
			showSearch: false
		})
	},
	render: function(){
		return (
			<div className="searchListBox">
				<div className="like">
					<div>{this.props.searchTitle}</div>
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
							<h3>{item.title}</h3>
							<div>{item.region}</div> 
							<div>${item.price}</div>
							<div>{item.rating}</div>
						</div>
						<div className="choices">
							<div className="choiceA"></div>
							<Link to="/productDetailPage"><div className="choiceB prodDetails">Product Details</div></Link>
						</div>
					</div>
				)
			})}
			</div>
			</div>
		)
	}
})