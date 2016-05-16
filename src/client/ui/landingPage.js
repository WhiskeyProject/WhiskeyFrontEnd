import React from 'react';
import store from 'store';

require("assets/styles/landingPage.scss");

export default React.createClass({
	render: function(){
		return (
			<div>
			<header></header>
			<div className="banner">

				<div className="shade">
					<p className="newFont">When</p>
					<p className="newFont">inspiration</p>
					<p className="newFont">meets</p>
					<p className="newFont">whiskey...</p>
				</div>
			</div>
				<p className="reply">Whiskey.</p>
				<p className="reply">One sip at a time.</p>
			</div>
		)
	}
})