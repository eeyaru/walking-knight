import { useContext } from "react";
import BoardContext from "../context/BoardContext";
import { formatChessSquare } from "../util/utils";

const InfoPath = () => {
    const boardContext = useContext(BoardContext)
    if (boardContext === null) { return <div></div>}
    
    const { been, shortestPath } = {...boardContext}
    const generateTiles = () => {
        let beenTiles: JSX.Element[]
        let nextTiles: JSX.Element[]
        beenTiles = been.map((name, idx) => {
            return (
                <div key={idx}>
                    <span className="path-item been-list">{formatChessSquare(name)}</span>
                    {idx !== shortestPath.length - 1 && <span className="path-arrow been-list">&rarr;</span>}
                </div>
            )
        })  

        nextTiles = shortestPath.filter(name => !been.includes(name)).map((name, idx) => { 
            return (
                <div key={idx+been.length}>
                    <span className="path-item">{formatChessSquare(name)}</span>
                    {idx !== shortestPath.length - been.length - 1 && <span className="path-arrow">&rarr;</span>}
                </div>
                )
            })
        return [...beenTiles, ...nextTiles]
    }
    return (
        <div className="info-path">{generateTiles()}</div>
    )
}

export default InfoPath