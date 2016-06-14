import React from 'react';
import store from 'store';

export default React.createClass({
	render: function(){
		return (
			<div className="tasteCategoryBox">
				<details open>
					<summary className="barrelBar topRounded">{this.props.category}</summary>
					<div className="barrelPopUp bottomRounded">
						{this.props.group.map(function(item,i){
						return <div key={i}><input onClick={this.props.getResults.bind(null, item, i)} type="checkbox"/>{item}</div>
						}.bind(this))}	
					</div>
				</details>
			</div>
		)
	}
})
