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
    const response = await  youtube.get('/search', {
      params :  {
        q: term
      }
    });

    const res = await  youtube.get('/comments', {
      params :  {
        q: term
      }
    });
    console.log(res);
    this.setState({
      videos : response.data.items,
      selectedVideo: response.data.items[0],
      //comments: ""
    });
  };


  onVideoSelect = (video) => { 
    console.log(video);
    this.setState({
      selectedVideo: video,
      //comments: 
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
              <VideoDetail video = {this.state.selectedVideo}/>
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
