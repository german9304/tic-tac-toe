import React, { useState } from "react";
import "./App.css";

export function CalculateWinner(board) {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winners.length; i++) {
    const [one, two, three] = winners[i];
    const boardOne = board[one];
    if (boardOne && boardOne === board[two] && boardOne === board[three]) {
      return [true, boardOne, [one, two, three]];
    }
  }
  return [false, "", []];
}

export function Square({ className, buttonNumber, handleClick }) {
  return (
    <button type="button" className={className} onClick={handleClick}>
      <span>{buttonNumber}</span>
    </button>
  );
}

export function Board({ board, squareClick, isWinner, winners }) {
  const SquareType = i => {
    const classType = type => {
      return `number ${i} ${type}`;
    };
    let win = winners.some(winner => winner === i);
    if (isWinner) {
      if (win) {
        return classType("winner");
      }
    }
    return classType("lose");
  };

  return (
    <div className="board">
      {board.map((number, i) => {
        return (
          <Square
            key={i}
            className={SquareType(i)}
            buttonNumber={number}
            handleClick={() => squareClick(i)}
          />
        );
      })}
    </div>
  );
}

function TicTacToe() {
  let [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  let [move, setMove] = useState(0);
  let [turn, setTurn] = useState(false);

  let isNext = turn ? "O" : "X";

  let currentSquares = history[move].squares;
  let [isWinner, whoWin, winners] = CalculateWinner(currentSquares);

  let nturn = <h2 className="turn">Next turn? {isNext}</h2>;
  let winner = <h2 className="winner-header"> Winner {whoWin}</h2>;

  function handleSquareClick(i) {
    let current = history.slice(0, move + 1);
    let currentHistory = current[move].squares;
    const newArr = [...currentHistory];
    newArr[i] = isNext;
    setHistory(prevHistory => {
      let newHistory = {
        squares: newArr
      };
      return [...current, newHistory];
    });
    setMove(prevMove => {
      return prevMove + 1;
    });
    setTurn(prev => !prev);
  }

  function handleMove(i) {
    setMove(i);
    setTurn(prev => !prev);
  }

  function handleClear() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setMove(0);
  }

  return (
    <div className="App">
      <header className="AppHeader">
        <h1 className="title">TIC TAC TOE </h1>
        {isWinner ? winner : nturn}
      </header>
      <section className="clear-game">
        <button className="clear-btn" onClick={handleClear}>
          clear game
        </button>
      </section>
      <div className="game">
        <div className="steps-moves">
          <Board
            board={history[move].squares}
            squareClick={handleSquareClick}
            isWinner={isWinner}
            winners={winners}
          />
        </div>
        <ol>
          {history.map((stp, mve) => {
            return (
              <li key={mve}>
                <div className="steps">
                  <button className="step-btn" onClick={() => handleMove(mve)}>
                    {" "}
                    Go to move # {mve}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default TicTacToe;
