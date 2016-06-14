import React from 'react';
import LoginOptions from 'ui/loginOptions';
import { Link } from 'react-router';

require("assets/styles/landingPage3.scss");

var image = require("assets/images/darkerLogo.png");


export default React.createClass({
	render: function(){
		return (
			<div className="widthSize">
				<div className="bgBanner">
					<div className="shade2">
						<div className="titleWords"><img src={image} /></div>
							<div className="textA">making the world of whiskey a little easier to explore.</div>
							<div className="landingPageTextBox">
							<div className="textB"></div>
							<div className="textC">May we make a suggestion...</div>
							<Link to="/likesPage2"><button className="enter">Shoot</button></Link>
							<div className="dividingLine"></div>
							<div className="textD">Making suggestions since 2016... that's how you <i>know</i> we get it right.</div> 

						</div>
					</div>
					
				</div>
				<LoginOptions />
			</div>
		)
	}
})