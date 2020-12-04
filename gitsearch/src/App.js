// https://www.freecodecamp.org/news/building-a-github-repo-explorer-with-react-and-elasticsearch-8e1190e59c13/

// THIS IS THE LINK TO THE PROJECT TUTORIAL AND FOR FUTURE EXPLANATION

import React, { useState } from "react";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import theme from "./theme";
import "./App.css";
import Results from "./Component/Result";
import Header from "./Component/Header";

const App = () => {
  const [currentTopics, setCurrentTopics] = useState([]);

  const setTopics = (currentTopics) => {
    setCurrentTopics(currentTopics || []);
  };

  const toggleTopic = (topic) => {
    const nextState = currentTopics.includes(topic)
      ? currentTopics.filter((item) => item !== topic)
      : currentTopics.concat(topic);
    setCurrentTopics(nextState);
  };

  return (
    <section className='container'>
      <ReactiveBase
        app='gitprobe-new'
        credentials='Maou9JFCQ:6069e052-4738-4738-80b6-694b281fca90'
        type='gitxplore-latest'
        theme={theme}
        themePreset='dark'>
        <div className='flex row-reverse app-container'>
          <Header currentTopics={currentTopics} setTopics={setTopics} />
          <div className='results-container datasearch-list'>
            <DataSearch
              componentId='repo'
              filterLabel='Search'
              dataField={[
                "name",
                "description",
                "name.raw",
                "fullname",
                "owner",
                "topics",
              ]}
              placeholder='Search Repos'
              iconPosition='left'
              autosuggest={true}
              URLParams
              className='data-search-container results-container'
              innerClass={{
                input: "search-input",
                list: "search-list",
              }}
              style={{ color: "white !important" }}
            />
            <Results currentTopics={currentTopics} toggleTopic={toggleTopic} />
          </div>
        </div>
      </ReactiveBase>
    </section>
  );
};

export default App;
