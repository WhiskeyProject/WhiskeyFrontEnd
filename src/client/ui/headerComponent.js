import React from 'react';
import store from 'store';
import { Link } from 'react-router';

require("assets/styles/headerComponent.scss");
var image = require("assets/images/darkerLogo.png");

export default React.createClass({
	
	render: function(){
		return (
			<div>
				
				<div className="topHeader">
					<div className="newShade">
						<div className="navImage">
							<Link to="/landingPage3"><img src={image} /></Link>
						</div>
						<div className="headerFlexBox">	
							<div className="navLinks">
								<Link to={this.props.page1}>{this.props.link1}</Link>
								<Link to={this.props.page2}>{this.props.link2}</Link>
								<Link to={this.props.page3}>{this.props.link3}</Link>
								<a href="#" onClick={this.userLogout}>Logout</a>
							</div>
						</div>
					</div>
				</div>
			

			</div>
		)
	}
})