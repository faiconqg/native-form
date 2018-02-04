import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'native-base'

export default class FullButton extends Component {
  static propTypes = {
    form: PropTypes.object,
    isPrimary: PropTypes.bool,
    label: PropTypes.string,
    onPress: PropTypes.func
  }

  render() {
    return (
      <Button
        transparent
        full
        primary={this.props.isPrimary}
        //style={{ backgroundColor: this.props.color, marginTop: 30 }}
        onPress={this.props.onPress}
      >
        <Text>{this.props.label}</Text>
      </Button>
    )
  }
}
