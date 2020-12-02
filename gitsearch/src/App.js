// https://www.freecodecamp.org/news/building-a-github-repo-explorer-with-react-and-elasticsearch-8e1190e59c13/

// THIS IS THE LINK TO THE PROJECT TUTORIAL AND FOR FUTURE EXPLANATION

// import React, { useState } from "react";
// import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
// import theme from "./theme";
// import "./App.css";
// import Results from "./Component/Result";
// import Header from "./Component/Header";

// const App = () => {
//   const [currentTopics, setCurrentTopics] = useState([]);

//   const setTopics = (currentTopics) => {
//     setCurrentTopics(currentTopics);
//   };

//   const toggleTopic = (topic) => {
//     const nextState = currentTopics.includes(topic)
//       ? currentTopics.filter((item) => item !== topic)
//       : currentTopics.concat(topic);
//     setCurrentTopics(nextState);
//   };

//   // XeP9DRff0:0ba86c01-03e6-4fc4-8f90-cfb84a6c5080
//   // Maou9JFCQ:6069e052-4738-4738-80b6-694b281fca90
//   return (
//     <section className='container'>
//       <ReactiveBase
//         app='gitprobe-new'
//         credentials='XeP9DRff0:0ba86c01-03e6-4fc4-8f90-cfb84a6c5080'
//         theme={theme}>
//         <div className='flex row-reverse app-container'>
//           <Header currentTopics={currentTopics} setTopics={setTopics} />
//           <div className='results-container'>
//             <DataSearch
//               componentId='repo'
//               filterLabel='Search'
//               dataField={[
//                 "name",
//                 "description",
//                 "name.raw",
//                 "fullname",
//                 "owner",
//                 "topics",
//               ]}
//               placeholder='Search Repos'
//               autosuggest={false}
//               iconPosition='left'
//               URLParams
//               className='data-search-container results-container'
//               innerClass={{
//                 input: "search-input",
//               }}
//             />
//             <Results currentTopics={currentTopics} toggleTopic={toggleTopic} />
//           </div>
//         </div>
//       </ReactiveBase>
//     </section>
//   );
// };

// export default App;

import React from "react";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import theme from "./theme";
import "./App.css";
import Results from "./Component/Result";

const App = () => {
  return (
    <section className='container'>
      <ReactiveBase
        app='gitprobe-new'
        credentials='Maou9JFCQ:6069e052-4738-4738-80b6-694b281fca90'
        theme={theme}>
        <nav className='navbar'>
          <div className='title'>GitProbe</div>
        </nav>
        <div className='flex row-reverse app-container'>
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
            <Results />
          </div>
        </div>
      </ReactiveBase>
    </section>
  );
};

export default App;
