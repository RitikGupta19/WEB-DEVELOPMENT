// import React from "react";
// import PropTypes from "prop-types";

// const Topic = ({ props }) => {
//   console.log("CHILDREN COMPONENTS", props.children);
//   const handleClick = () => {
//     props.toggleTopic(props.children);
//   };
//   return (
//     <div
//       className={`topic ${props.active ? "active" : ""}`}
//       onClick={handleClick}>
//       #{props.children}
//     </div>
//   );
// };

// Topic.propTypes = {
//   children: PropTypes.string,
//   active: PropTypes.bool,
//   toggleTopic: PropTypes.func,
// };

// export default Topic;

import React from "react";
import PropTypes from "prop-types";

const Topic = (props) => {
  const handleClick = () => {
    console.log("clicked##################", props);
    props.toggleTopic(props.children);
  };
  console.log(props);
  return (
    <div
      className={`topic ${props.active ? "active" : ""}`}
      onClick={() => handleClick()}>
      #{props.children}
    </div>
  );
};

Topic.propTypes = {
  children: PropTypes.string,
  active: PropTypes.bool,
  toggleTopic: PropTypes.func,
};

export default Topic;
