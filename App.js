import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AppConsumer, AppProvider } from './Context'
import Button from './components/Button'
import Field from './components/Field'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5
  },
  text: {
    position: 'absolute',
    top: 0,
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
                  { App.renderWinner(state.gameOver, state.winner) }
                  <Field
                    action = { functions.onTurn }
                    fieldIsActive = { state.fieldIsActive && !state.gameOver }
                    field = { state.field }
                  />
                  <Button
                    text = { state.gameOver ? 'Restart Game!' : state.aiPhrase }
                    action = { functions.onResetField }
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
