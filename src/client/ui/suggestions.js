import React from 'react';
import store from 'store';
import { Link } from 'react-router';


require("assets/styles/userPage.scss");
require('font-awesome-webpack');

export default React.createClass({
	closeWindow: function(){
		store.dispatch({
			type: 'CHANGE_SHOW',
			show: false
		})
	},
	render: function(){
		return (
			<div className="likeBox">
				<div className="like">
					<div>Our Suggestions</div>
					<div><i onClick={this.closeWindow} className="fa fa-times fa-2x"></i></div>
				{/*}	<div onClick={this.handleClick} className="moreButton">How Bout A Few More</div> */}
				</div>
				<div className="closeButton">
					
					<div className="products">
						
						{this.props.comparables.map(function(item){
							return (
								<div key={item.id} className="eachItem">
									<div className="suggestImage">
										<img className="suggestImage" src={item.img_url} />
									</div>
									<div className="suggestText">
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
			</div>
		)
	}
})