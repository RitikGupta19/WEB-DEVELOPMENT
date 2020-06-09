import React from 'react';
import profile from '../profile.jpg';

const VideoDetail = ({ video }) => {

    if (!video) {
        return <div></div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div>
            <div className="ui embed">
                <iframe title= "video player" src = {videoSrc} />
            </div><br />
            <div class="ui list">
                <div class="item">
                <img class="ui avatar image" src={profile}  />
                <div class="content">
                <a class="header">{video.snippet.channelTitle}</a>
                <div class="description">Last seen watching <a><b>Arrested Development</b></a> just now.</div>
                </div>
            </div>
            </div><br />
            <div className="ui segment">
                <h4 className= "header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
           
        </div>
    );
};

export default VideoDetail;