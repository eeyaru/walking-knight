import React, { useState, useContext, useEffect } from "react";
import BoardContext from "../context/BoardContext";
import { ControlsProps } from "../App";
import Walker from "../compute/walk";

function Controls(props: ControlsProps) {
    const [findDisabled, setFindDisabled] = useState<boolean>(true)
    const [resetDisabled, setResetDisabled] = useState<boolean>(true)
    const boardContext = useContext(BoardContext)
    const { size } = {...props}
    if (boardContext === null) { return <div></div>}
    const { setSelected, selected, setShortestPath } = {...boardContext}

    const findShortestPath = (e: React.MouseEvent<HTMLElement>) => {
        const walker = new Walker(size, [parseInt(selected[0][0]), parseInt(selected[0][1])], [parseInt(selected[1][0]), parseInt(selected[1][1])])
        const shortestPath = walker.findShortestPath()
        setShortestPath(shortestPath)
    }
    
    const resetSelection = (e: React.MouseEvent<HTMLElement>) => {
        setSelected([])
        setShortestPath([])
    }

    useEffect(() => {
        if (boardContext?.selected.length == 2) {
            setFindDisabled(false)
        } else {
            setFindDisabled(true)
        }
    }, [boardContext?.selected])

    useEffect(() => {
        if (boardContext?.selected.length > 0) {
            setResetDisabled(false)
        } else {
            setResetDisabled(true)
        }
    }, [boardContext?.selected])

    return(
        <div className="controls">
            <button className='find-btn' disabled={findDisabled} onClick={(e) => findShortestPath(e)}>Find Shortest Path</button>
            <button className='reset-btn' disabled={resetDisabled} onClick={(e) => resetSelection(e)}>Reset</button>
        </div>
    )
}

export default Controls