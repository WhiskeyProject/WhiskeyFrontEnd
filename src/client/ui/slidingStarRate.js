import React from 'react';
import store from 'store';

require("assets/styles/slidingStarRate.scss");


export default React.createClass({
	
	render: function(){
		return (
			<div>
			<fieldset className="rating">
				<input type="radio" id="star5" className="rating" value="100" /><label htmlFor="star5" title="Perfect">5 stars</label>
				<input type="radio" id="star4" className="rating" value="80" /><label htmlFor="star4" title="Pretty good">4 stars</label>
				<input type="radio" id="star3" className="rating" value="60" /><label htmlFor="star3" title="Meh">3 stars</label>
				<input type="radio" id="star2" className="rating" value="40" /><label htmlFor="star2" title="Kinda Terrible">2 stars</label>
				<input type="radio" id="star1" className="rating" value="20" /><label htmlFor="star1" title="Me No Like">1 star</label>
			</fieldset>
			</div>
			)
	}
})