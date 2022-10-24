import React from "react";
export interface BoardContextInterface {
    selected: string[]
    setSelected: Function
    shortestPath: string[]
    setShortestPath: Function
    been: string[]
    setBeen: Function
}

export default React.createContext<BoardContextInterface | null>(null);