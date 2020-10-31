import React from "react";
import Square from "./Square";

const Board = ({ squares, handleClick }) => {
  return (
    <div className='board'>
      {squares.map((square, index) => {
        console.log(square);
        <Square
          key={index}
          value={square}
          onClick={(index) => handleClick(index)}
        />;
      })}
    </div>
  );
};

export default Board;
