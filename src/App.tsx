import { useState } from 'react'
import knightImg from './assets/knight.svg'
import './App.css'
import './styles/Board.css'
import Board from './components/Board'
import Controls from './components/Controls'
import BoardContext,{ BoardContextInterface } from './context/BoardContext'
import Info from './components/Info'
import Footer from './components/Footer'

export interface BoardProps {
  size: number
}

export interface ControlsProps {
  size: number
}

function App() {
  const [size, setSize] = useState<number>(8)
  const [selected, setSelected] = useState<string[]>([])
  const [been, setBeen] = useState<string[]>([])
  const [shortestPath, setShortestPath] = useState<string[]>([])
  const boardContext : BoardContextInterface = {
    selected: selected,
    setSelected: setSelected,
    shortestPath: shortestPath,
    setShortestPath: setShortestPath,
    been: been,
    setBeen: setBeen,
  }

  return (
    <div className="App">
      <h1 className='title'>Walking <img className='title-img' src={knightImg}/> Knight</h1>
      <BoardContext.Provider value={boardContext}>
        <Info/>
        <Board size={size} />
        <Controls size={size}/>
      </BoardContext.Provider>
      <Footer/>
    </div>
  )
}

export default App
