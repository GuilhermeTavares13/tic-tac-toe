import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import {useState} from 'react'

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    // const [activePlayer,setActivePlayer] = useState('X');
    const [gameTurns,setGameTurns] = useState([]);
    const currentPlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex,colIndex) {
        // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns(prevTurns =>{
            let currentPlayer = 'X';
            if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }
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
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} turns={gameTurns} />
        </div>
          <Log turns={gameTurns} />
      </main>
  )
}

export default App
