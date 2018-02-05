import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button as NativeButton, Text } from 'native-base'

export default class Button extends Component {
  static propTypes = {
    form: PropTypes.object,
    isPrimary: PropTypes.bool,
    label: PropTypes.string,
    onPress: PropTypes.func
  }

  render() {
    return (
      <NativeButton
        transparent
        full
        primary={this.props.isPrimary}
        //style={{ backgroundColor: this.props.color, marginTop: 30 }}
        onPress={this.props.onPress}
      >
        <Text>{this.props.label}</Text>
      </NativeButton>
    )
  }
}
