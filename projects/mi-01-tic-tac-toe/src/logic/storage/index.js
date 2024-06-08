export const saveGameToStorage = (turn, board) => {
    window.localStorage.setItem('turn', turn)
    window.localStorage.setItem('board', JSON.stringify(board))
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')
}