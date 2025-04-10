import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import {useState} from 'react'
import {WINNING_COMBINATIONS} from "./winning-combinations.js";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    const [gameTurns,setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = initialGameBoard;

    for(const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {

        }
    }

    function handleSelectSquare(rowIndex,colIndex) {
        setGameTurns((prevTurns) =>{
            const activePlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [
                {
                    square:{
                    row: rowIndex, col: colIndex
                }
                , player: activePlayer}
                ,...prevTurns];
            return updatedTurns;
        });
    }

    return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
            <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
        </div>
          <Log turns={gameTurns} />
      </main>
  )
}

export default App
