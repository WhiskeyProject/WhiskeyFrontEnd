import React from 'react';
import store from 'store';
import StarRating from 'ui/starRating';

require("assets/styles/reviews.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="reviewFlex prodDetailContainer">
				
					{this.props.reviews.map(function(item, i) {
						return (
							<div className="eachReview" key={i}>
							<div className="reviewTitle">{item.title}</div>
							<StarRating rating={item.rating} />
							<div className="reviewText">{item.text}</div>
							</div>
						)
					})}
				
			</div>
		)
	}
})