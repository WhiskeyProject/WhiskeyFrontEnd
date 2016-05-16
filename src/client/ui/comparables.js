import React from 'react';
import store from 'store';
import { getWhiskey } from 'api/data';
import StarRating from 'ui/starRating';
import { Link } from 'react-router';


require("assets/styles/productDetailPage.scss")
require("assets/styles/comparables.scss")


export default React.createClass({
	handleClick: function(item, e){
		e.preventDefault();
		getWhiskey(item.id);
	},
	render: function(){
		return (
			<div className="bigCompFlex prodDetailContainer">
			<div className="compFlex">
				{this.props.comparables.map(function(item, i){
					return (
						<div className="itemsLayout" key={i}>
							<div className="itemImage">
								<img className="itemImage" src={item.img_url} />
							</div>
							<div className="itemDescription">
								<div className="titleDiv">{item.title}</div>
								<div>{item.region}</div> 
								<div className="priceColor">${item.price}</div>
								<StarRating rating={item.rating} />
							</div>
							<div className="choices">
								<Link to={"/productDetailPage/" + item.id} onClick={this.handleClick.bind(this, item)}><div className="choiceB">Product Details</div></Link>
							</div>
						</div>

					)
				}.bind(this))}
			</div>
			</div>
		)
	}
})