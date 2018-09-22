import React from 'react'
import PropTypes from 'prop-types'
import { Button as DefaultButton } from 'react-native'

const $colorRed = '#DA3D4D'


export default function Button({text, action}) {
  return(
    <DefaultButton
      onPress = { () => action() }
      title = { text }
      color = { $colorRed }
      accessibilityLabel = { text }
    />
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}
