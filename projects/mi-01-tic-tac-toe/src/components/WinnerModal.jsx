import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame }) => {
    if (winner === null) return null

    const winnerText = winner === false ? 'Empate' : 'Ganó'

    return (
      <section className='winner'>
        <div className='text'>
          <h1>{winnerText}</h1>

          <header className="win">
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