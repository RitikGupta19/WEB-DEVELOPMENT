import React, { Component } from 'react';
import './App.css';
import SeasonDisplay from './SeasonDisplay';
import Spinner  from './Spinner';

class App extends Component {

  state = {
    lat : null,
    errorMessage : ''
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => { this.setState({lat: position.coords.latitude}) },
      (error) => { this.setState({ errorMessage : error.message })}
    );
  }

  contentRender = () => {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          <div>Error : {this.state.errorMessage}</div>
           <img className = "error-image" src='/error.png' alt = "logo" />;
        </div>
      );
    }
     if (!this.state.errorMessage && this.state.lat) {
       return <SeasonDisplay lat = {this.state.lat}/>;
      }
      return <Spinner message = "Please allow Location Access"/>;
   }
  

  render() {
    return <div>{this.contentRender()}</div>    
  };
};

export default App;
