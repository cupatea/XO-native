import findAvalibleCells from './findAvalibleCells'

export default function({ field, targetPlayer }) {
  const winCombinations =[
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1'],
  ]
  const availableCells =
    findAvalibleCells(field)

  const targetPlayerMoves = field
    .filter(cell => cell.player === targetPlayer)
    .map(cell => cell.position)

  let isWinner = false
  winCombinations.forEach((combination) => {
    if (combination.every(element => targetPlayerMoves.includes(element))) {
      isWinner = true
      return
    }
  })

  if (isWinner) {
    return ({
      winner: targetPlayer === 'X' ? 'Win!' : 'Lose',
      gameOver: true,
      win: true
    })
  }

  if (!isWinner && availableCells.length === 0) {
    return ({
      winner: 'Draw!',
      gameOver: true,
      win: false
    })
  }

  return ({
    winner: null,
    gameOver: false,
    win: false
  })
}
