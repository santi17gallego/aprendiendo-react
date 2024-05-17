import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
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


function Square({ children, isSelected, updateBoard, index }) {

  const classname = isSelected ? 'square is-selected' : 'square'

  function handleClick() {
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

  const resetGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
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
    } return null
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
  }

  function updateBoard(index) {

    if(board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
  
    <main className='board'>
      <h1>Mi Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) =>
            <Square key={index} updateBoard={updateBoard} index={index}>
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
              <h2 className='text'>
                {winner ? 'Ganó' : 'Empate'}
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
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
