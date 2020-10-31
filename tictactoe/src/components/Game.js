import React, { Fragment, useState } from "react";
// import { calculateWinner } from "../Helper";
import Board from "./Board";

const Game = () => {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [XisNext, setXisNext] = useState(true);

  const handleClick = (i) => {
    const sqaures = [...boardSquares];
    if (sqaures[i]) return;
    sqaures[i] = XisNext ? "X" : "O";
    setBoardSquares(sqaures);
    setXisNext(!XisNext);
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>React - TIC TAC TOE</h1>
      <Board squares={boardSquares} handleClick={handleClick} />
    </Fragment>
  );
};

export default Game;
