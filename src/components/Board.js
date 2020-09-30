import React, { useState } from "react";
import Square from "./Square";
import swal from "sweetalert";

const Board = () => {
  let status;
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const restart = () => {
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach(element => {
      element.style.background = "#fff";
      element.style.color = "black";
    });
    setSquares(Array(9).fill(null));
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        let allSquares = document.querySelectorAll(".square");
        let winSquares = [allSquares[a], allSquares[b], allSquares[c]];
        winSquares.forEach(element => {
          element.style.background = "#f2f2f2";
          element.style.color = "#288334";
        });
        return squares[a] === "X" ? player1 : player2;
      }
    }
    return null;
  };

    const winner = calculateWinner(squares);
    if (winner) {
      swal({
        title: winner,
        text: "Ha ganado esta partida",
        icon: "success",
        buttons: {
          cancel: "Ver tablero",
          comfirm: "Revancha!!"
        }
      }).then(value => {
        if (value) restart();
      });
      status = "El ganador es : " + winner;
    } else {
      status = "El siguiente en jugar es: " + (xIsNext ? player1 : player2);
    }

  const handleClick = i => {
    if (!player1 || !player2) {
      swal({
        title: "Error",
        text: "Por favor escriba los nombres antes de empezar",
        icon: "error"
      });
      return;
    }

    const squaresNew = squares.slice();
    if (calculateWinner(squaresNew) || squaresNew[i]) {
      return;
    }
    squaresNew[i] = xIsNext ? "X" : "O";
    setSquares(squaresNew);
    setXIsNext(!xIsNext);
  };

  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const getName = num => {
    swal({
      title: "Escriba el nombre del Jugador " + num,
      content: "input"
    }).then(name => {
      num === 1 ? setPlayer1(name) : setPlayer2(name);
    });
  };

  return (
    <div className="board-container">
      <div className="players">
        <h1>TRIQUI!!</h1>
        <div className="player-name">
          <label>Jugador 1:</label>
          <p>&nbsp; {player1} &nbsp;</p>
          <i onClick={() => getName(1)} className="far fa-edit"></i>
        </div>
        <div className="player-name">
          <label>Jugador 2:</label>
          <p>&nbsp; {player2} &nbsp;</p>
          <i onClick={() => getName(2)} className="far fa-edit"></i>
        </div>
      </div>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="btn-restart" onClick={restart}>
        Reiniciar!!
      </button>
    </div>
  );
};

export default Board;
