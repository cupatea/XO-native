import React from 'react'

import PropTypes from 'prop-types'

const defaultField = [
  { player: null, position: 'A1', row: 1 },
  { player: null, position: 'B1', row: 1 },
  { player: null, position: 'C1', row: 1 },
  { player: null, position: 'A2', row: 2 },
  { player: null, position: 'B2', row: 2 },
  { player: null, position: 'C2', row: 2 },
  { player: null, position: 'A3', row: 3 },
  { player: null, position: 'B3', row: 3 },
  { player: null, position: 'C3', row: 3 },
]
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

const defaultState = {
  field: defaultField,
  gameOver: false,
}
const AppContext = React.createContext()
export class AppProvider extends React.Component {

  static findAvalibleCells(field) {
    return field.filter(cell => cell.player !== 'X' && cell.player !== 'O')
  }

  static findBestCell(field) {
    return AppProvider.minMax({ field, targetPlayer: 'O'}).cell
  }

  static checkWinner({ field, targetPlayer }) {
    const availableCells =
      AppProvider.findAvalibleCells(field)

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

  static minMax = ({field, targetPlayer}) => {
    const newField = [...field]
    const avalibleCells = AppProvider.findAvalibleCells(newField)

    if (AppProvider.checkWinner({ field: newField, targetPlayer: 'X' }).win) {
      return { score: -10 }
    }
    if (AppProvider.checkWinner({ field: newField, targetPlayer: 'O' }).win) {
      return { score: 10 }
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
          AppProvider.minMax({
            field: turnField,
            targetPlayer: 'X'
          })
        move.score = result.score
      }
      if (targetPlayer === 'X') {
        const result =
          AppProvider.minMax({
            field: turnField,
            targetPlayer: 'O'
          })
        move.score = result.score
      }
      return move
    })

    let bestMove

    if (targetPlayer === 'O') {
      let bestScore = -10000
      moves.forEach(move => {
        if (move.score > bestScore) {
          bestScore = move.score
          bestMove = move
        }
      })
    }
    if (targetPlayer === 'X') {
      let bestScore = 10000
      moves.forEach(move => {
        if (move.score < bestScore) {
          bestScore = move.score
          bestMove = move
        }
      })
    }
    return bestMove
  }

  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentDidUpdate(_, prevState) {
    const { lastMove, gameOver, field } = this.state
    if(prevState.lastMove !== lastMove && !gameOver && lastMove.player === 'X') {
      this.handleTurn({
        targetPlayer: 'O',
        targetCell: AppProvider.findBestCell(field),
      })
    }
  }

  handleResetField() {
    this.setState(defaultState)
  }

  handleTurn({ targetPlayer, targetCell }){
    const { field } = this.state
    const updatedField = field.map((cell) => {
      if(targetCell.position === cell.position) {
        return ({
          ...targetCell,
          player: targetPlayer,
        })
      }
      return cell
    })
    const { winner, gameOver } =
      AppProvider.checkWinner({ field: updatedField, targetPlayer })

    this.setState({
      field: updatedField,
      lastMove: {
        player:  targetPlayer,
        position: targetCell.position,
      },
      winner,
      gameOver,
    })
  }

  render() {
    const { children } = this.props
    return (
      <AppContext.Provider
        value = { {
          state: { ...this.state },
          functions: {
            onResetField: this.handleResetField.bind(this),
            onTurn: this.handleTurn.bind(this),
          }
        } }
      >
        { children }
      </AppContext.Provider>
    )
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const AppConsumer = AppContext.Consumer
