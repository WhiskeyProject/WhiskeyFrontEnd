import React from 'react';
import store from 'store';

require("assets/styles/starRating.scss");


// this.props.rating is width percentage
export default React.createClass({
	render: function(){
		return (
			<div className="star-ratings-css">
				<div className="star-ratings-css-top" style={{width: this.props.rating}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
				<div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
			</div>
		)
	}
})