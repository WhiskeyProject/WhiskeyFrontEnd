import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default React.createClass({
    getInitialState: function(){
        return ({
            rating: 1;
        })
    },
    onStarClick: function(name, value) {
        this.setState({rating: value});
    },

    render: function() {
        const { rating } = this.state;
        return (                
            <div>
                <h2>Rating from state: {rating}</h2>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
})
