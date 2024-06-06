import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const TURNS = {
  X: <img src="https://img.icons8.com/?size=100&id=Gg4msLAVHgdE&format=png&color=000000" alt="naruto" />,
  O: <img src="https://img.icons8.com/?size=100&id=RcukI1uvfdy2&format=png&color=000000" alt="tsudane" />
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ( { index, children, updateBoard, isSelected } ) => {

  const classname = isSelected ? 'square is-selected' : 'square'

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={classname} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {

  const [turn, setTurn] = useState(TURNS.X)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {

    if (board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    
  }

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }

    }
  }

  const resetGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((e) => e !== null)
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
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h1>
                {winner === false ? 'Empate' : 'Ganó'}
              </h1>

              <header>
                {
                  winner ? <Square>{winner}</Square> : ''
                }
              </header>

              <footer>
                <button onClick={resetGame}>Nuevo juego</button>
              </footer>


            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
