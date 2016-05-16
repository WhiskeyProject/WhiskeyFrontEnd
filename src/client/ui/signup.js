import React from 'react';
import { login } from 'api/data';
import { Link, browserHistory } from 'react-router';
import { addNewUser } from 'api/data';

require('assets/styles/login.scss');


export default React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: "",
			passwordMatch: "",
			error: false

		}
	},
	handleChange: function(e){
		if (e.target.id === 'username') {
			this.setState({
				username: e.target.value,
				password: this.state.password,
				passwordMatch: this.state.passwordMatch
			})
		} else if(e.target.id === 'password'){
			this.setState({
				username: this.state.username,
				password: e.target.value,
				passwordMatch: this.state.passwordMatch
			})
		} else if(e.target.id === 'passwordMatch') {
			this.setState({
				username: this.state.username,
				password: this.state.password,
				passwordMatch: e.target.value
			})
		}
		
	},
	handleSubmit: function(e){
		e.preventDefault();
		if(this.state.password === this.state.passwordMatch) {
			addNewUser(this.state.username, this.state.password, function(){
				browserHistory.push('/login');
			}.bind(this)).catch(function(err){
		}.bind(this));
		} else {
			this.setState({
				error: true,
				username: "",
				password: "", 
				passwordMatch: ""
			});
		}
	},
  render: function () {
    return (
    	
	      	<div className="signupBox">
	      			<form action="" method="post" onSubmit={this.handleSubmit} id="registrationForm">
			      		<input type="text" onChange={this.handleChange} value={this.state.username} name="user" id="username" placeholder="Username"/><br />
			      		<input type="password" onChange={this.handleChange} value={this.state.password} id="password" name="password" placeholder="Password"/> 
			      		<input type="password" onChange={this.handleChange} value={this.state.passwordMatch} id="passwordMatch" placeholder="Password"/> 

			      		<button className="signupButton">Sign Up</button>
			      		{this.state.error ? <div className='signupError'>Passwords do not match</div> : ''}

	      			</form>
	      		
	      		
	      		
	      </div>
      
    )
  }
})