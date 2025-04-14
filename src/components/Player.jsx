import {useRef, useState} from "react";

export default function Player({name,symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name);

    function handleEdit() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol,playerName);
        }

    }

    function handlePlayerNameChange(e) {
        setPlayerName(e.target.value);
    }

    let player = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        player = <input type="text" required defaultValue={playerName} onChange={handlePlayerNameChange} />;
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}