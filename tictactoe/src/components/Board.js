import React from "react";
import Square from "./Square";

const Board = ({ squares, handleClick }) => {
  console.log(squares);
  return (
    <div className='board'>
      {squares.map((square, index) => {
        console.log(square, index);
        <Square
          key={index}
          value={square}
          onClick={() => handleClick(index)}
        />;
      })}
    </div>
  );
};

export default Board;
