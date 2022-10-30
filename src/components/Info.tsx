import { useContext } from "react";
import BoardContext from "../context/BoardContext";
import { formatChessSquare } from "../util/utils";
import InfoPath from "./InfoPath";

function Info() {
    const boardContext = useContext(BoardContext)
    if (boardContext === null) { return <div></div>}
    
    const { selected, shortestPath } = {...boardContext}
    
    return(
        <div className="info">
            {!shortestPath.length && <span className='selected-tiles'>
                {selected.length ? "Selected ".concat(selected.map(x => formatChessSquare(x)).join(' and ')) : "No Tiles Selected"}
            </span>}
            <InfoPath/>
        </div>
    )
}

export default Info