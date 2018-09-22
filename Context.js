import React from 'react'

import PropTypes from 'prop-types'

const defaultField = [
  { player: '', position: 'A1', row: 1 },
  { player: '', position: 'B1', row: 1 },
  { player: '', position: 'C1', row: 1 },
  { player: '', position: 'A2', row: 2 },
  { player: '', position: 'B2', row: 2 },
  { player: '', position: 'C2', row: 2 },
  { player: '', position: 'A3', row: 3 },
  { player: '', position: 'B3', row: 3 },
  { player: '', position: 'C3', row: 3 },
]
const winCombinations =[
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
  ['C1', 'C2', 'C3'],
  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],
  ['A1', 'B2', 'C3'],
  ['C1', 'B2',' A3'],
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
    const availableCells =
      AppProvider.findAvalibleCells(field)

    // Take the first avalible cell
    return availableCells[0]
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
        gameOver: true
      })
    }

    if (!isWinner && availableCells.length === 0) {
      return ({
        winner: 'Draw!',
        gameOver: true
      })
    }

    return ({
      winner: null,
      gameOver: false
    })
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
