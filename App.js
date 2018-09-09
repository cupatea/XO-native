import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from './components/Button'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function App() {
  return (
    <View style = { styles.container }>
      <Button
        text = 'Refresh'
        action = { () => {} }
      />
    </View>
  )
}
