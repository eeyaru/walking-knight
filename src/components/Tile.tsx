import React, { useState, useContext, useEffect } from "react";
import { Color, TileProps } from "./Board"
import BoardContext from "../context/BoardContext";
import Knight from "./Knight";

function Tile(props: TileProps) {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const { color, name, children } = {...props}
    const colorClass = color === Color.black ? "black" : "white"
    const boardContext = useContext(BoardContext)

    useEffect(() => {
        if (isSelected || (boardContext !== null && boardContext.selected.includes(name))) {
            setIsSelected(boardContext !== null && boardContext.selected.includes(name))
        }
    }, [boardContext?.selected])

    const selectTile = (e: React.MouseEvent<HTMLElement>) => {
        if (boardContext === null) { return }
        if (boardContext?.selected.length < 2 && !boardContext.selected.includes(name)) {
            boardContext.setSelected((prevState: string[]) => {
                return [...prevState, name]
            })
        } else if (boardContext.selected.includes(name)) {
            boardContext.setSelected((prevState: string[]) => {
                return prevState.filter(item => item != name)
            })
        }
    }

    return(
        <div className={isSelected ? `${colorClass} tile selected` : `${colorClass} tile`} onClick={(e) => selectTile(e)}>
            {children}
        </div>
    )
}

export default Tile