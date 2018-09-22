import React from 'react'
import PropTypes from 'prop-types'
import { Button as DefaultButton } from 'react-native'

export default function Button({text, action}) {
  return(
    <DefaultButton
      onPress = { () => action() }
      title = { text }
      color = '#DA3D4D'
      accessibilityLabel = { text }
      zIndex = { 2 } 
    />
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}
