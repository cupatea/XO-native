import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'


const $colorBlack = '#292929'
const $colorWhite = 'white'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  element: {
    flex: 1,
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    paddingTop: 4,
    borderWidth: 1,
    borderColor: $colorBlack,
  },
  text: {
    fontSize: 80,
    fontFamily: 'Marker Felt',
  }
})

export default class Field extends React.Component {

  renderActiveCell(element) {
    const { action } = this.props
    return(
      <TouchableHighlight
        style = { styles.element }
        underlayColor = { $colorWhite }
        key = { element.position }
        onPress = { () => action({ targetPlayer: 'X', targetCell: element }) }
      >
        <Text style = { styles.text }>
          { element.player }
        </Text>
      </TouchableHighlight>
    )
  }
  static renderPassiveCell(element) {
    return(
      <View style = { styles.element } key = { element.position }>
        <Text style = { styles.text }>
          { element.player }
        </Text>
      </View>
    )
  }
  renderRow(rowIndex) {
    const { field, fieldIsActive } = this.props
    return field
      .filter(element => element.row === rowIndex)
      .map(element => fieldIsActive && element.player !== 'X' && element.player !== 'O'
        ? this.renderActiveCell(element)
        : Field.renderPassiveCell(element))
  }
  render() {
    const { rowCount } = this.props
    const arrayOfRowsIndexes = Array(rowCount).fill().map((_, i) => i + 1)
    return(
      <View style = { styles.container }>
        {
          arrayOfRowsIndexes.map(rowIndex => (
            <View key = { rowIndex } style = { styles.row }>
              { this.renderRow(rowIndex) }
            </View>
          ))
        }
      </View>
    )
  }
}

Field.defaultProps = {
  fieldIsActive: true,
  rowCount: 3,
}

Field.propTypes = {
  fieldIsActive: PropTypes.bool,
  rowCount: PropTypes.number,
  field: PropTypes.arrayOf(PropTypes.shape({
    palyer: PropTypes.string,
    position: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
  })).isRequired,
  action: PropTypes.func.isRequired,
}
