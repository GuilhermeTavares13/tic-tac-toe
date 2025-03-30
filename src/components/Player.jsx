import {useRef, useState} from "react";

export default function Player({name,symbol}) {

    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name);

    function handleEdit() {
        setIsEditing((editing) => !editing);
    }

    function handlePlayerNameChange(e) {
        setPlayerName(e.target.value);
    }

    let player = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        player = <input type="text" required defaultValue={playerName} onChange={handlePlayerNameChange} />;
    }

    return (
        <li>
            <span className="player">
                {player}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}