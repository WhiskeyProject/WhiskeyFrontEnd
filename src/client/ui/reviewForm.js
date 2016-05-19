import React from 'react';
import store from 'store';
import Reviews from 'ui/reviews';
import SlidingStarRate from 'ui/slidingStarRate';
import { postNewReview } from 'api/data';
import StarRatingComponent from 'react-star-rating-component';




require("assets/styles/reviewForm.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			whiskey: 0,
			title: "",
			text: "",
			rating: 0
		})
	},
	handleChange: function(e){
		e.preventDefault();
		this.setState({
			title: this.refs.title.value,
			text: this.refs.text.value
		})
	},
	
	handleSubmit: function(e){
		e.preventDefault();
		console.log('Whiskey ID sent:', this.props.id);
		var ratingNum = this.state.rating * 20;
		console.log(ratingNum);
		var reviewData = {
			whiskey: this.props.id,
			title: this.state.title,
			text: this.state.text,
			rating: ratingNum
		}
		console.log("reviewData", reviewData);	
		postNewReview(reviewData);
		
			this.setState({
				title: "",
				text: "",
				rating: 0

		})
		
		

	},

	onStarClick(rating, prevRating, name) {
		console.log(arguments);
		console.log(rating);
        this.setState({rating: rating});
    },
	render: function(){
		return (
			<div className="reviewFormFlex prodDetailContainer">
			<form className="reviewForm" onSubmit={this.handleSubmit}>
				<input type='text' ref="title" placeholder="Title" onChange={this.handleChange} value={this.state.title}/>
						{/* <Rater total={5} onRate={this.onRate} /> */}
				<StarRatingComponent name="rating" starCount={5} value={this.state.rating} onStarClick={this.onStarClick}/>
				<textarea placeholder="Review" ref="text" rows="4" cols="20" onChange={this.handleChange} value={this.state.text}>
				</textarea>
				<button>Submit</button>
			</form>
			
			</div>
		)
	}
})