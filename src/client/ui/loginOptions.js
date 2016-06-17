import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';
import Login from 'ui/login';
import Signup from 'ui/signup';


require("assets/styles/loginOptions.scss");


export default React.createClass({
	getInitialState: function(){
		return {
			currentUser: false,
			signup: false
		}
	},
	closeLogin: function () {
		this.setState({
			currentUser: false
		})
	},
	closeSignup: function () {
		this.setState({
			signup: false
		})
	},
	handleClick: function(e){
		var val = e.target.id;
		// console.log(val);
		if(val === "login") {
			this.setState({
				currentUser: true,
				signup: false
			})
		} 
			
		else if(val === "signup"){
			this.setState({
				currentUser: false,
				signup: true
			})	
		}
		// console.log(this.state.currentUser);
	},
	render: function(){
		return (
			<div className="login">
				{this.state.currentUser ? <Login close={this.closeLogin} /> : ""}
				{this.state.signup ? <Signup close={this.closeSignup} /> : ""}
				<a href="#"><div className="in" onClick={this.handleClick} id="login">Login</div></a>
				<a href="#"><div className="up" onClick={this.handleClick} id="signup">Signup</div></a>
			</div>
		)
	}
})