import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [players, setPlayers] = useState({
    player1 : '',
    player2:''
  })

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
        return squares[a] === 'X' ? players.player1 : players.player2
      }
    }
    return null;
  };

  const handleClick = i => {
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

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "El ganador es : " + winner;
  } else {
    status = "Siguiente: " + (xIsNext ? players.player1 : players.player2);
  }
  const handleInputChange = (e) => {
    setPlayers({
      ...players,
      [e.target.name]: e.target.value
    });
  }
 const restart = () => {
   setSquares(Array(9).fill(null))
   console.log('hola')
 }

  return (
    <div className="board-container">
      <div className="players">
        <h3>Escriba los nombres de los jugadores</h3>
        <label>Jugador 1:</label>
        <input type="text" onChange={handleInputChange} name='player1' placeholder="Nombre"/>
        <label>Jugador 2:</label>
        <input type="text" onChange={handleInputChange} name='player2' placeholder="Nombre"/>
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
      <button className="btn-restart" onClick={restart}>Reiniciar!!</button>
    </div>
  );
};

export default Board;
