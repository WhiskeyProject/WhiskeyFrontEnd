import React from 'react';
import store from 'store';
import SaveSearch from 'ui/saveSearch';
import { Link } from 'react-router';
// import { getWhiskey } from 'api/data';
import StarRating from 'ui/starRating';

require("assets/styles/likesPage2.scss");
require('font-awesome-webpack');

export default React.createClass({
	// closeWindow: function(){
	// 	store.dispatch({
	// 		type: 'CHANGE_SHOWSEARCHITEM',
	// 		showSearchItem: false
	// 	})
	// },
	render: function(){
		return (
			<div className="tempResults">
			{/* <div className="searchResultsListBox">
				<div className="like">
					<div>{this.props.searchTag}</div>
					<div><i onClick={this.closeWindow} className="fa fa-times fa-2x"></i></div>
				</div>
			<div className="searchResultsBox"> */}
			
			{this.props.tagSearch.map(function(item, i){
				return (
						<div className="itemsLayout" key={i}>
							<div className="itemImage">
								<img className="itemImage" src={item.img_url} />
							</div>
							<div className="itemDescription">
								<div className="titleDiv">{item.title}</div>
								<div>{item.region}</div>
								<div>${item.price}</div>

								<StarRating rating={item.rating} />
							</div>
						</div>
						)
			})}
			{/* </div>
			</div> */}
			</div>
		)
	}
})