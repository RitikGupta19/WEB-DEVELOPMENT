import React from "react";

const Square = ({ value, handleClick }) => {
  const style = value ? `squares ${value}` : `squares`;
  console.log(value);

  return (
    <button className={style} onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
