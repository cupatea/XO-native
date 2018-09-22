import findAvalibleCells from './findAvalibleCells'
import checkWinner from './checkWinner'

export default function minMax({field, targetPlayer}) {
  const newField = [...field]
  const avalibleCells = findAvalibleCells(newField)

  if (checkWinner({ field: newField, targetPlayer: 'X' }).win) {
    return { score: -100 }
  }
  if (checkWinner({ field: newField, targetPlayer: 'O' }).win) {
    return { score: 100 }
  }
  if (avalibleCells.length === 0) {
    return { score: 0 }
  }

  const moves = avalibleCells.map(cell => {
    const move = { cell }
    const turnField = newField.map(element => {
      if (element.position ===  cell.position) {
        return ({
          ...element,
          player: targetPlayer
        })
      }
      return element
    })

    if (targetPlayer === 'O') {
      const result =
        minMax({
          field: turnField,
          targetPlayer: 'X'
        })
      move.score = result.score
    }
    if (targetPlayer === 'X') {
      const result =
        minMax({
          field: turnField,
          targetPlayer: 'O'
        })
      move.score = result.score
    }
    return move
  })

  let bestMove

  if (targetPlayer === 'O') {
    let bestScore = -1000
    moves.forEach(move => {
      if (move.score > bestScore) {
        bestScore = move.score
        bestMove = move
      }
    })
  }
  if (targetPlayer === 'X') {
    let bestScore = 1000
    moves.forEach(move => {
      if (move.score < bestScore) {
        bestScore = move.score
        bestMove = move
      }
    })
  }
  return bestMove
}
