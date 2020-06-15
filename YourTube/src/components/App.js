import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends Component {
  state = {
    videos : [],
    selectedVideo : null,
    comments: []
  };

  componentDidMount = () => {
    this.onTermSubmitHandler('buildings');
  }

  onTermSubmitHandler = async (term) => {
    const response = await youtube.get('/search', {
      params :  {
        q: term
      }
    }); 
    this.setState({
      videos : response.data.items,
      selectedVideo: response.data.items[0]
    });
  };


  onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video,
    });
  };
  
  render() {
    return (
      <div className = "ui container">
        <div className="ui grid">
          <div className="ui row">
            <div className="five wide column">
              <i className="red huge youtube sqaure link active icon">YourTube</i>
            </div>
           <div className="eleven wide column">
            <SearchBar onTermSubmit = {this.onTermSubmitHandler}/>
          </div>
          </div>
        </div>
        <div className = "ui grid">
          <div className = "ui row">
            <div className = "eleven wide column">
              <VideoDetail 
                video = {this.state.selectedVideo}
                comments={this.state.comments}/>
            </div>
            <div className = "five wide column">
              <VideoList 
                onVideoSelect = {this.onVideoSelect} 
                videos = {this.state.videos}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
