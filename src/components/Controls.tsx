import React, { useState, useContext, useEffect } from "react";
import BoardContext from "../context/BoardContext";
import { ControlsProps } from "../App";
import Walker from "../util/walk";

function Controls(props: ControlsProps) {
    const boardContext = useContext(BoardContext)
    const { size } = {...props}
    if (boardContext === null) { return <div></div>}
    const { setSelected, selected, setShortestPath, setBeen } = {...boardContext}

    let findDisabled = boardContext?.selected.length == 2 ? false : true
    let resetDisabled = boardContext?.selected.length > 0 ? false : true

    const findShortestPath = (e: React.MouseEvent<HTMLElement>) => {
        const walker = new Walker(size, [parseInt(selected[0][0]), parseInt(selected[0][1])], [parseInt(selected[1][0]), parseInt(selected[1][1])])
        const shortestPath = walker.findShortestPath()
        setShortestPath(shortestPath)
    }
    
    const resetSelection = (e: React.MouseEvent<HTMLElement>) => {
        setSelected([])
        setShortestPath([])
        setBeen([])    
    }

    return(
        <div className="controls">
            <button className='find-btn' disabled={findDisabled} onClick={(e) => findShortestPath(e)}>Find Shortest Path</button>
            <button className='reset-btn' disabled={resetDisabled} onClick={(e) => resetSelection(e)}>Reset</button>
        </div>
    )
}

export default Controls