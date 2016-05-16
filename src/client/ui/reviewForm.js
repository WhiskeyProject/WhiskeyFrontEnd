import React from 'react';
import store from 'store';
import { postNewReview } from 'api/data';
import StarRatingReact from 'react-star-rating';
import Reviews from 'ui/reviews';

require("assets/styles/reviewForm.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			whiskey: 0,
			title: "",
			text: "",
			rating: ""
		})
	},
	handleChange: function(){
		this.setState({
			title: this.refs.title.value,
			text: this.refs.text.value,
			rating: this.refs.rating.value
		})
	},
	handleSubmit: function(e){
		e.preventDefault();
		var ratingToNum = Number(this.state.rating);
		console.log('Whiskey ID sent:', this.props.id);
		var reviewData = {
			whiskey: this.props.id,
			title: this.state.title,
			text: this.state.text,
			rating: ratingToNum
		}	
		postNewReview(reviewData);
		
			this.setState({
				title: "",
				text: "",
				rating: ""

		})
		
		

	},
	render: function(){
		return (
			<div className="reviewFormFlex prodDetailContainer">
			<form className="reviewForm" onSubmit={this.handleSubmit}>
				<input type='text' ref="title" placeholder="Title" onChange={this.handleChange} value={this.state.title}/>
				
				<input type='number' ref="rating" onChange={this.handleChange} value={this.state.rating}/>
				<textarea placeholder="Review" ref="text" rows="4" cols="20" onChange={this.handleChange} value={this.state.text}>
				</textarea>
				<button>Submit</button>
			</form>
			
			</div>
		)
	}
})