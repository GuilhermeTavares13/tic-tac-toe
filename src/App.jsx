import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import {useState} from 'react'
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
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

function deriverWinner(gameBoard,player) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol
            && firstSquareSymbol === secondSquareSymbol
            && firstSquareSymbol === thirdSquareSymbol) {
            winner = player[firstSquareSymbol];
        }
    }

    return winner;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for(const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {
    const [player, setPlayers] = useState(PLAYERS);
    const [gameTurns,setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriverWinner(gameBoard,player);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex,colIndex) {
        setGameTurns((prevTurns) =>{
            const activePlayer = deriveActivePlayer(prevTurns);

            return [
                {
                    square: {
                        row: rowIndex, col: colIndex
                    }
                    , player: activePlayer
                }
                , ...prevTurns];
        });
    }

    function handleRematch() {
        setGameTurns([]);
    }

    function handlePlayerChange(symbol,newName) {
        setPlayers(prevPlayers=>{
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }

    return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerChange} />
            <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerChange} />
          </ol>
            {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch} />}
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
        </div>
          <Log turns={gameTurns} />
      </main>
  )
}

export default App
