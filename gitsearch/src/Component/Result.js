// import React from "react";
// import { SelectedFilters, ReactiveList } from "@appbaseio/reactivesearch";
// import Topic from "./Topic";
// import PropTypes from "prop-types";
// import { SortOptions } from "./Data";

// const onResultStats = (results, time) => (
//   <div className='flex justify-end'>
//     {results} results found in {time}ms
//   </div>
// );

// const onData = (data, currentTopics, toggleTopic) => (
//   <div className='result-item' key={data.fullname}>
//     <div className='flex justify-center align-center result-card-header'>
//       <img className='avatar' src={data.avatar} alt='User avatar' />
//       <a
//         className='link'
//         href={data.url}
//         target='_blank'
//         rel='noopener noreferrer'>
//         <div className='flex wrap'>
//           <div>{data.owner}/</div>
//           <div>{data.name}</div>
//         </div>
//       </a>
//     </div>
//     <div className='m10-0'>{data.description}</div>
//     <div className='flex wrap justify-center'>
//       {data.topics.slice(0, 7).map((item) => (
//         <Topic
//           key={item}
//           active={currentTopics.includes(item)}
//           toggleTopic={toggleTopic}>
//           {item}
//         </Topic>
//       ))}
//     </div>
//     <div className='flex'>
//       <div>
//         <div className='btn card-btn'>
//           <i className='card-icon fas fa-star' />
//           {data.stars}
//         </div>
//       </div>
//       <div>
//         <div className='btn card-btn'>
//           <i className='card-icon fas fa-code-branch' />
//           {data.forks}
//         </div>
//       </div>
//       <div>
//         <div className='btn card-btn'>
//           <i className='card-icon fas fa-eye' />
//           {data.watchers}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const Results = ({ toggleTopic, currentTopics }) => {
//   return (
//     <div className='result-list'>
//       <SelectedFilters className='m1' />
//       <ReactiveList
//         componentId='results'
//         dataField='name'
//         onData={(data) => onData(data, currentTopics, toggleTopic)}
//         onResultStats={onResultStats}
//         react={{
//           and: [
//             "language",
//             "topics",
//             "pushed",
//             "created",
//             "stars",
//             "forks",
//             "repo",
//           ],
//         }}
//         pagination
//         innerClass={{
//           list: "result-list-container",
//           pagination: "result-list-pagination",
//           resultsInfo: "result-list-info",
//           poweredBy: "powered-by",
//         }}
//         size={6}
//         sortOptions={SortOptions}
//       />
//     </div>
//   );
// };

// Results.propTypes = {
//   toggleTopic: PropTypes.func,
//   currentTopics: PropTypes.arrayOf(PropTypes.string),
// };
// export default Results;

import React from "react";
import { SelectedFilters, ReactiveList } from "@appbaseio/reactivesearch";

const Results = () => {
  const onResultStats = (results, time) => {
    return (
      <div className='flex justify-end'>
        {results} results found in {time}ms
      </div>
    );
  };

  const dataSearched = (data) => {
    return (
      <div className='result-item' key={data.fullname}>
        {data.owner}/{data.name}
      </div>
    );
  };

  return (
    <div className='result-list'>
      <SelectedFilters className='m1' />
      <ReactiveList
        componentId='results'
        dataField='name'
        // onData={dataSearched}
        onResultStats={onResultStats}
        react={{
          and: ["repo"],
        }}
        pagination
        innerClass={{
          list: "result-list-container",
          pagination: "result-list-pagination",
          resultsInfo: "result-list-info",
          poweredBy: "powered-by",
        }}
        size={6}
        renderItem={(data) => {
          return dataSearched(data);
        }}
      />
    </div>
  );
};

export default Results;
