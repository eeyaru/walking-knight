import { useState, useContext, useEffect } from "react";
import { BoardProps } from "../App"
import Tile from "./Tile"
import Knight from "./Knight";
import BoardContext from "../context/BoardContext";

export interface TileProps {
    color: Color
    name: string
    children?: React.ReactNode
}

export enum Color {
    black,
    white
}

const Board = (props: BoardProps) => {
    const { size } = {...props}
    const [currKnightTile, setCurrKnightTile] = useState<string | null>(null)
    const [sleepTime, setSleepTime] = useState<number>(800)
    const boardContext = useContext(BoardContext)
    const [tilePositions, setTilePositions] = useState<Array<Array<[number, number]>>| null>(null)

    // Update tile the knight is rendered in
    useEffect(() => {
        if (boardContext?.shortestPath === undefined) { return }

        let interval: number
        let idx = 0
        setCurrKnightTile(boardContext?.selected[0])
        interval = setInterval(() => {
            setCurrKnightTile(boardContext?.shortestPath[idx])
            idx += 1
            if (idx > boardContext?.shortestPath.length) {
                clearInterval(interval)
            }
        }, sleepTime)

        return () => clearInterval(interval)

    }, [boardContext?.shortestPath])

    // Remove knight when tile is deselected/reset 
    useEffect (() => {
        if (boardContext?.selected === undefined) { return }
        if (boardContext?.selected.length < 2) { setCurrKnightTile(null) }
    }, [boardContext?.selected])


    return (
        <div className="board">
            {[...Array(size).keys()].map((i) => {
                return (
                    <div key={i} className="row">
                        {[...Array(size).keys()].map((j) => {
                            const color = i % 2 === j % 2 ? Color.white : Color.black
                            const name = `${i}${j}`
                            return (
                                <Tile color={color} key={name} name={name}>
                                    {currKnightTile === name &&
                                        <Knight/>
                                    }
                                </Tile>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Board
