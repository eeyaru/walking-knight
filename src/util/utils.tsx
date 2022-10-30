// Receives chess square in format "XY", where X, Y are the x and y coordiates, starting from the top left of the board, 0 indexed
export const formatChessSquare = (name: string) => {
    return `${String.fromCharCode(parseInt(name[1])+65)}${-parseInt(name[0])+ 8}`
}

export const getBeenSquares = (shortestPath: string[], currentTile: string) => {
    return shortestPath.slice(0, shortestPath.indexOf(currentTile)+1)
}