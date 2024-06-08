import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { TURNS } from './constants.js'

import { Square } from './components/Square.jsx'

import { checkWinner, checkEndGame } from './logic/board.js'

import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { WinnerModal } from './components/WinnerModal.jsx'


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {

    if (board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage(newTurn, newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    } 
  }



  const resetGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)

    resetGameStorage()

  }



  return (

    <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className='game'>
        {
          board.map((square, index) =>
            <Square key={index} index={index} updateBoard={updateBoard}
             >
              {square}
            </Square>
          )
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
