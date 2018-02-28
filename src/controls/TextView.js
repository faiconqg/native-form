import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item, Input, Label } from 'native-base'

export default class TextView extends Component {
  static propTypes = {
    form: PropTypes.object,
    itemRenderer: PropTypes.func,
    dataField: PropTypes.string,
    label: PropTypes.any,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.any,
    isPassword: PropTypes.bool,
  }

  focus = () => {
    this.input._root.focus()
  }

  componentDidMount() {
    this.props.form.attachInput(this)
  }

  onSubmitEditing = () => {
    const nextItem = this.props.form.getNextItem(this)
    if (nextItem) {
      nextItem.focus()
    }
  }

  onChangeText = value => {
    this.setState({ value: value })
    this.props.form.setDataItem(value, this.props.dataField)
  }

  _renderText = () => {
    let value = this.props.form.getDataItem(this.props.dataField)
    if (this.props.itemRenderer) {
      return this.props.itemRenderer(value)
    } else {
      return value
    }
  }

  render() {
    return (
      <Item floatingLabel>
        <Label>{this.props.label}</Label>
        <Input
          getRef={me => (this.input = me)}
          returnKeyType="next"
          blurOnSubmit={false}
          style={{ color: 'black' }}
          value={this._renderText()}
          autoCapitalize={this.props.autoCapitalize}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.isPassword}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
        />
      </Item>
    )
  }
}
