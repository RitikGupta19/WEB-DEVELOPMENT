import React from "react";

const Square = ({ value, handleClick }) => {
  const style = value !== null ? `squares ${value}` : `squares`;
  console.log("hi", value);

  return (
    <button className={style} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
