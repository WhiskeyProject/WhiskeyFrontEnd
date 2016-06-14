import React from 'react';
import { Link, browserHistory } from 'react-router';
import { login, addNewUser } from 'api/data';

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
	closeBox: function(){
		this.props.close();
	},
	handleSubmit: function(e){
		e.preventDefault();
		browserHistory.push('/userPage2');
		if(this.state.password === this.state.passwordMatch) {
			addNewUser(this.state.username, this.state.password, function(){
				browserHistory.push('/userPage2');
				console.log('It gets past browserHistory');
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
			      		<input type="password" onChange={this.handleChange} value={this.state.passwordMatch} id="passwordMatch" placeholder="Confirm Password"/> 

			      		<button className="signupButton">Sign Up</button>
			      		<i className="fa fa-times-circle posCircle" onClick={this.closeBox}></i>
			      		{this.state.error ? <div className='signupError'>Passwords do not match</div> : ''}

	      			</form>
	      		
	      		
	      		
	      </div>
      
    )
  }
})