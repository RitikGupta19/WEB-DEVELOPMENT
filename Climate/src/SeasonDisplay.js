import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
    winter : {
        text : 'Burr it is chilly. Stay in your home. It is winter right now there, am i right? Yeah i know i am :)',
        iconName : 'snowflake'
    },
    summer : {
        text : 'Lets hit the beach. It is summer right now there, am i right? Yeah i know i am :)',
        iconName : 'sun'
    }
};

const getSeason = (lat, month) => {
    if(month>2 && month < 9 ){
        return lat > 0 ? 'summer' : 'winter';
    }
    else {
        return lat > 0 ? 'winter' : 'summer';
    }
};

const SeasonDisplay = (props) => {
    const season = getSeason( props.lat, new Date().getMonth());
    const {text , iconName} = seasonConfig[season];
    
    return (
     <div className= {`season-display ${season}`}>
        <i className = {`icon-left massive ${iconName} icon`} />
        <h1>{text}</h1>
        <i className = {`icon-right massive ${iconName} icon`} />
    </div>
    );
};

export default SeasonDisplay;