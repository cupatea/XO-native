import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AppConsumer, AppProvider } from './Context'
import Button from './components/Button'
import Field from './components/Field'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  text: {
    position: 'absolute',
    top: '4%',
    margin: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 80,
    fontFamily: 'Marker Felt',
    zIndex: 1,
  }
})

export default class App extends React.Component  {
  static renderWinner(gameOver, winner) {
    if (gameOver) {
      return (
        <Text style = { styles.text }>
          { winner }
        </Text>
      )
    }
  }
  render() {
    return (
      <AppProvider>
        <View style = { styles.container }>
          <AppConsumer>
            {
              ({ state, functions }) => (
                <React.Fragment>
                  <Button
                    text = 'Restart Game!'
                    action = { functions.onResetField }
                  />
                  { App.renderWinner(state.gameOver, state.winner) }
                  <Field
                    action = { functions.onTurn }
                    fieldIsActive = { !state.gameOver }
                    field = { state.field }
                  />
                </React.Fragment>
              )
            }
          </AppConsumer>

        </View>
      </AppProvider>
    )
  }

}
