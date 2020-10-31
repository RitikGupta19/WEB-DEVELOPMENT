import React, { Fragment, useState } from "react";
import { calculateWinner } from "../Helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xisNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const XO = xisNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // return if winner or occupied
    if (winner || squares[i]) return;

    squares[i] = XO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xisNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () => {
    history.map((step, move) => {
      const destination = move ? `Go to #${move}` : `Go to Start`;
      return (
        <li key={move}>
          <button
            onClick={() => {
              jumpTo(move);
            }}>
            {destination}
          </button>
        </li>
      );
    });
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>React - TIC TAC TOE</h1>
      <Board squares={history[stepNumber]} handleClick={handleClick} />
      <div className='info-wrapper'>
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? `Winner: ${winner}` : `Next Player: ${XO}`}</h3>
      </div>
    </Fragment>
  );
};

export default Game;
