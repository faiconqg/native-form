import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item, Label, Picker } from 'native-base'
import { Platform } from 'react-native'

export default class Spinner extends Component {
  static propTypes = {
    form: PropTypes.object,
    itemRenderer: PropTypes.func,
    dataField: PropTypes.string,
    label: PropTypes.any,
    dataProvider: PropTypes.array,
    labelField: PropTypes.string
  }

  static defaultProps = {
    dataProvider: [],
    labelField: 'name'
  }

  componentDidMount() {
    this.props.form.attachInput(this)
  }

  onChange = value => {
    this.setState({ value: value })
    this.props.form.setDataItem(value, this.props.dataField)
  }

  _getValue = () => {
    return this.props.form.getDataItem(this.props.dataField)
  }

  _renderText = item => {
    if (this.props.itemRenderer) {
      return this.props.itemRenderer(item)
    } else {
      return item[this.props.labelField]
    }
  }

  render() {
    let itemList = this.props.dataProvider
    if (Platform.OS !== 'ios' && !this._getValue()) {
      let itemEmpty = { id: -1 }
      itemEmpty[this.props.labelField] = 'Selecione'
      itemList = [itemEmpty].concat(itemList)
    }

    return (
      <Item stackedLabel>
        <Label>{this.props.label}</Label>
        <Picker
          getRef={me => (this.input = me)}
          iosHeader="Selecione"
          placeholder="Selecione"
          mode="dialog"
          style={{ width: '100%' }}
          headerBackButtonText="Voltar"
          selectedValue={this._getValue()}
          onValueChange={this.onChange}
        >
          {itemList.map(item => (
            <Picker.Item
              key={item.id}
              label={this._renderText(item)}
              value={item.id}
              enabled={false}
            />
          ))}
        </Picker>
      </Item>
    )
  }
}
