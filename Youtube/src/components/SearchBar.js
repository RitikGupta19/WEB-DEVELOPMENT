import React, { Component } from 'react';

class SearchBar extends Component {
		state = {
				term : ''
		}

		onChangeHandler = (event) => {
				this.setState({term : event.target.value});
		}

		onFormSubmitHandler = (event) => {
				event.preventDefault();
				this.props.onTermSubmit(this.state.term);
		}

		render() {
				return (
						<div className = "search-bar ui segment">
								<form onSubmit = {this.onFormSubmitHandler} className = "ui form">
										<div className = "ui icon input container">
												<input 
														type = "text"
														value = {this.state.term}
														onChange = {this.onChangeHandler}
														placeholder="Video Search"/>
												<i className="search icon" />
										</div>
								</form>
						</div>
				);
		}
}

export default SearchBar;