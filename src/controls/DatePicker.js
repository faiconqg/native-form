import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item, Input, Label, Button, Icon } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

export default class DatePicker extends Component {
  static propTypes = {
    form: PropTypes.object,
    itemRenderer: PropTypes.func,
    dataField: PropTypes.string,
    label: PropTypes.any,
    description: PropTypes.string
  }

  state = {
    isVisible: false
  }

  _showDateTimePicker = () => this.setState({ isVisible: true })

  _hideDateTimePicker = () => this.setState({ isVisible: false })

  _handleDatePicked = date => {
    this.props.form.setDataItem(date, this.props.dataField)
    this._hideDateTimePicker()
  }

  _renderText = () => {
    let value = this.props.form.getDataItem(this.props.dataField)
    if (this.props.itemRenderer) {
      return value ? this.props.itemRenderer(value) : this.props.label
    } else {
      return value ? value.toLocaleDateString('pt-BR') : this.props.label
    }
  }

  render() {
    return (
      <Item onPress={this._showDateTimePicker} style={{ marginTop: 20 }}>
        <Label>{this._renderText()}</Label>
        <Input editable={false} />
        <Button transparent dark onPress={this._showDateTimePicker}>
          <Icon active name="calendar" />
        </Button>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          datePickerModeAndroid={'spinner'}
          titleIOS={this.props.label}
          is24Hour={false}
          showDateTimePicker={this._showDateTimePicker}
        />
      </Item>
    )
  }
}
