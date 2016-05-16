import React from 'react';
import store from 'store';
import LoginOptions from 'ui/loginOptions';
import { Link } from 'react-router';

require("assets/styles/landingPage2.scss");

export default React.createClass({
	render: function(){
		return (
			<div>
				
				<div className="banner">
					<div className="alignLeft">	
					<div className="newFont spaces">Whiskey</div>
						<div className="newFont indent">~in a whole new lighT~</div>
						<div className="line"></div>
							<div className="question">May we make a suggestion...?</div>
								<Link to="/likesPage"><button className="enter">Shoot</button></Link>
					</div>
				</div>
				
				<LoginOptions />
			</div>
		)
	}
})