import React, { useState } from "react";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import theme from "./theme";
import "./App.css";
import Results from "./Component/Result";
import Header from "./Component/Header";

const App = () => {
  const [currentTopics, setCurrentTopics] = useState([]);

  const setTopics = (currentTopics) => {
    setCurrentTopics(currentTopics);
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
        app='gitxplore-app'
        credentials='4oaS4Srzi:f6966181-1eb4-443c-8e0e-b7f38e7bc316'
        type='gitxplore-latest'
        theme={theme}>
        <div className='flex row-reverse app-container'>
          <Header currentTopics={currentTopics} setTopics={setTopics} />
          <div className='results-container'>
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
              autosuggest={false}
              iconPosition='left'
              URLParams
              className='data-search-container results-container'
              innerClass={{
                input: "search-input",
              }}
            />
            <Results currentTopics={currentTopics} toggleTopic={toggleTopic} />
          </div>
        </div>
      </ReactiveBase>
    </section>
  );
};

export default App;
