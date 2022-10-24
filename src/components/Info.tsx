import { useState, useContext } from "react";
import BoardContext, { BoardContextInterface } from "../context/BoardContext";

function Info() {
    const boardContext = useContext(BoardContext)
    if (boardContext === null) { return <div></div>}
    const { selected } = {...boardContext}

    const makeChessSquare = (name: string) => {
        return `${String.fromCharCode(parseInt(name[1])+65)}${-parseInt(name[0])+ 8}`
    }
    
    return(
        <div className="info">{selected.length ? "Selected ".concat(selected.map(x => makeChessSquare(x)).join(' and ')) : "No Tiles Selected"}</div>
    )
}

export default Info