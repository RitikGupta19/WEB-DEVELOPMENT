import React, { useState } from "react";
import { calculateWinner } from "../Helper";

const Game = () => {
  const [boardSquares, setBoardSquares] = useState(Array[9].fill(null));
  const [XisNext, setXisNext] = useState(true);

  const handleClick = (i) => {
    const sqaures = [...boardSquares];
    if (sqaures[i]) return;
    sqaures[i] = XisNext ? "X" : "O";
    setBoardSquares(sqaures);
    setXisNext(!XisNext);
  };
};

export default Game;
