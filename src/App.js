import React, { useState } from 'react';
import './App.scss';

// Home Component for when no game is active

function Home({ setGameActive }) {

  return (
    <div className="main-content">
      <h1 className="title">TicTacToe</h1>
      <p className="sub-text">Welcome To TicTacToe! To Play a game hit the button below!</p>
      <button className="game-btn" onClick={setGameActive.bind(this, true)}>Start Game</button>
    </div>
  )

}

// Game component that displays game
function Game(props) {

  // Handler For Exit Button
  const exitHandler = () => {
    props.setGameActive(false);
    props.setBoard(['', '', '', '', '', '', '', '', '']);
    props.setWinner(null);
  }

  // Handler For Clicking a box
  const clickHandler = (index) => {

    // Define Variables

    let boxSpan = document.querySelector(`#square-${index} span`);
    let player = props.activePlayer;
    let threePlayer = [player, player, player];

    // Only do stuff if box is empty (No X nor O)

    if (boxSpan.textContent === '') {

      let newBoard = props.board;
      newBoard[index] = player;
      props.setBoard(newBoard);
      boxSpan.textContent = player;

      if (props.board.slice(0, 3).join('') === threePlayer.join('') ||
        props.board.slice(3, 6).join('') === threePlayer.join('') ||
        props.board.slice(6, 9).join('') === threePlayer.join('') ||
        `${props.board[0]}${props.board[3]}${props.board[6]}` === threePlayer.join('') ||
        `${props.board[1]}${props.board[4]}${props.board[7]}` === threePlayer.join('') ||
        `${props.board[2]}${props.board[5]}${props.board[8]}` === threePlayer.join('') ||
        `${props.board[2]}${props.board[4]}${props.board[6]}` === threePlayer.join('') ||
        `${props.board[0]}${props.board[4]}${props.board[8]}` === threePlayer.join('')
      ) {

        // Set Winner State
        props.setWinner(player);

        // Show Alert
        props.setAlertStatus(true);

      } else if (!props.board.includes('')) {

        // Set Winner State
        props.setWinner(null);

        // Show Alert
        props.setAlertStatus(true);

      } else {

        let newActivePlayer = player === 'X' ? "O" : 'X';

        props.setActivePlayer(newActivePlayer);

      }

    }
  }

  return (
    <div className="game">
      <h2 className="current-player">Current Player: {props.activePlayer}</h2>
      <div className="board">
        {props.board.map((box, index) => {
          return (
            <div className="square" onClick={clickHandler.bind(this, index)} id={`square-${index}`} key={index}><span>{box}</span></div>
          )
        })}
      </div>
      <button className="exit-btn" onClick={exitHandler}>Leave Game</button>
    </div>
  )
}

function App() {

  const [gameActive, setGameActive] = useState(false);
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [activePlayer, setActivePlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [alertStatus, setAlertStatus] = useState(false);

  const playAgain = () => {
    setAlertStatus(false);
    setBoard(['', '', '', '', '', '', '', '', '']);
  }
  return (
    <div className="App">

      <div className={`alert ${alertStatus ? 'shown' : ''}`}>

        <p className="text">
          {winner === null ? `The Game Was a Tie!` : `Player ${winner} has won!`}
        </p>

        <button className="play-again" onClick={playAgain}>Play Again</button>

      </div>

      {gameActive ? <Game board={board} setAlertStatus={setAlertStatus} setBoard={setBoard} activePlayer={activePlayer} setActivePlayer={setActivePlayer} winner={winner} setWinner={setWinner} setGameActive={setGameActive} /> : <Home setGameActive={setGameActive} />}

    </div>
  );
}

export default App;
