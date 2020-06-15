import React from 'react';
import profile from '../profile.jpg';

const VideoDetail = ({ video}) => {
    if (!video) {
        return <div></div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div>
            <div className="ui embed">
                <iframe title= "video player" src = {videoSrc} />
            </div><br />
            <div className="ui list">
                <div className="item">
                <img className="ui avatar image" src={profile}  />
                <div className="content">
                <p className="header">{video.snippet.channelTitle}</p>
                <div className="description"></div>
                </div>
            </div>
            </div><br />
            <div className="ui segment">
                <h4 className= "header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
            <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            <form className="ui reply form">
                <div className="field">
                <textarea></textarea>
                </div>
                <div className="ui blue labeled submit icon button">
                <i className="icon edit"></i> Add Reply
                </div>
            </form>
            </div>
        </div>
    );
};

export default VideoDetail;

            