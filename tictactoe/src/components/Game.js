import React, { useState } from "react";
import { calculateWinner } from "../Helper";

const Game = () => {
  const [history, setHistory] = useState([Array[9].fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [XisNext, setXisNext] = useState(true);

  const winner = calculateWinner(history[stepNumber]);
  const XO = XisNext ? "X" : "O";
};

export default Game;
