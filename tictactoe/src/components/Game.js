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
    // keeps copy of all the arrays, history wise
    const historyPoint = history.slice(0, stepNumber + 1);
    // console.log(historyPoint);
    //keeps copy of array one step before
    const current = historyPoint[stepNumber];
    // console.log(current);
    //key copy of array one step before
    const squares = [...current];
    // console.log(squares);

    // return if winner or occupied block
    if (winner || squares[i]) return;

    squares[i] = XO;
    //set history with state before clicking
    setHistory([...historyPoint, squares]);
    // console.log(history);
    // stepnumber before clicking
    setStepNumber(historyPoint.length);
    // console.log(stepNumber);
    setXIsNext(!xisNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>React - TIC TAC TOE</h1>
      <button
        className='btn btn-outline-info my-3'
        onClick={() => restartGame()}>
        Restart Game
      </button>
      <br />
      <Board squares={history[stepNumber]} onClick={handleClick} />
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
