import React from 'react'
import PropTypes from 'prop-types'
import checkWinner from './actions/checkWinner'
import findBestMove from './actions/findBestMove'
import findRandomCell from './actions/findRandomCell'


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

const defaultState = {
  field: defaultField,
  gameOver: false,
  fieldIsActive: true,
  lastMove: null,
  aiPhrase: 'AI: Lets play!',
}
const AppContext = React.createContext()
export class AppProvider extends React.Component {

  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentDidUpdate(_, prevProps) {
    const { gameOver, fieldIsActive, field} = this.state
    if(!fieldIsActive && !gameOver) {
      this.aiTurn(field, prevProps.lastMove)
    }
  }

  handleResetField() {
    this.setState(defaultState)
  }

  aiTurn(field, lastMove) {
    let targetCell, aiPhrase
    if (lastMove) {
      const bestMove = findBestMove(field)
      targetCell = bestMove.cell
      if (bestMove.score === 100) {
        aiPhrase = 'AI: Winter is coming!'
      }
      if (bestMove.score === 0) {
        aiPhrase = 'AI: You know nothing Jon Snow'
      }
      if (bestMove.score === -100) {
        aiPhrase = 'AI: Hodor!'
      }
    } else {
      targetCell = findRandomCell(field)
      aiPhrase = 'AI: Hmm...'
    }

    this.handleTurn({
      targetPlayer: 'O',
      targetCell,
    })
    this.setState({
      aiPhrase
    })
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
      checkWinner({ field: updatedField, targetPlayer })

    this.setState({
      field: updatedField,
      lastMove: {
        player:  targetPlayer,
        position: targetCell.position,
      },
      winner,
      gameOver,
      fieldIsActive: targetPlayer === 'O',
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
