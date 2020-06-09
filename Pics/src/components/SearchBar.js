import React, { Component } from 'react';

class SearchBar extends Component {

	state = {
		term : ''
	}

	formSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state.term);
	}

  render() {
    return (
      <div className = "ui segment">
				<form onSubmit = { this.formSubmitHandler } className = "ui form">
					<div className = "field">
						<label>Get your Images Here!</label>
						<input 
							type = "text" 
							value = {this.state.term}
							onChange = {(event) => this.setState({term : event.target.value})}
							placeholder="For Eg. Cars"/>
					</div>
				</form>
			</div>
    );
  }
}

export default SearchBar;