import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item, Label, Picker, Button, Text } from 'native-base'
import { Platform } from 'react-native'

export default class Spinner extends Component {
  static propTypes = {
    form: PropTypes.object,
    itemRenderer: PropTypes.func,
    dataField: PropTypes.string,
    label: PropTypes.any,
    dataProvider: PropTypes.any,
    labelField: PropTypes.string,
    refreshing: PropTypes.bool,
    extend: PropTypes.string,
    extendPrompt: PropTypes.string,
    dummy: PropTypes.bool,
    export: PropTypes.string
  }

  static defaultProps = {
    dataProvider: [],
    labelField: 'name',
    refreshing: false
  }

  componentDidMount() {
    this.props.form.attachInput(this)
  }

  onChange = value => {
    if (value == -1) return
    this.props.form.setDataItem(value, this.props.dataField, this.props.dummy)
    this._emptyChild()
    this._refreshExport()
    this.forceUpdate()
  }

  _emptyChild = () => {
    if (this.props.export) {
      let ext = this.props.form.ext[this.props.export]
      this.props.form.setDataItem(null, ext.props.dataField, ext.props.dummy)
    }
  }

  _refreshExport = update => {
    let value = this.props.form.getDataItem(this.props.dataField, this.props.dummy)
    if (this.props.export && this._enabled()) {
      let ext = this.props.form.ext[this.props.export]
      let itemList = this._resolveItemList()
      if (!value) {
        if (ext._getValue()) {
          value = itemList.find(x => {
            let item = x.get(this.props.export)
            if (item) {
              return item.find(y => y.id == ext._getValue())
            } else {
              return null
            }
          })
          if (value) {
            this.props.form.setDataItem(value.id, this.props.dataField, true, false)
            this.props.form.setDataItem(
              value.get(this.props.export),
              this.props.export, true, update
            )
          } else {
            console.error('id ' + ext._getValue() + ' does not exist in ' + ext.props.dataField)
          }
        }
      } else {
        let item = itemList.find(x => x.id == value)
        if (item) {
          item = item.get(this.props.export)
        } else {
          console.error('id ' + value + ' does not exist in ' + this.props.dataField)
        }
        this.props.form.setDataItem(item, this.props.export, true, update)
      }
    }
  }

  _getValue = () => {
    let item = this.props.form.getDataItem(this.props.dataField, this.props.dummy)
    if (!item) {
      this._refreshExport(false)
    }
    return item
  }

  _renderText = item => {
    if (this.props.itemRenderer) {
      return this.props.itemRenderer(item)
    } else {
      return item.attributes
        ? item.get(this.props.labelField)
        : item[this.props.labelField]
    }
  }

  _getId = item => {
    return item.id
  }

  _getPrompt = () => {
    this._refreshExport(false)
    if (this.props.refreshing || (this.props.extend && this._getValue())) {
      return 'Carregando...'
    } else if (this.props.extend && this.props.extendPrompt && !this._parentSelected()) {
      return this.props.extendPrompt
    } else {
      return 'Selecione'
    }
  }

  _enabled = () => {
    return this._resolveItemList().length > 0
  }

  _parentSelected = () => {
    return !!this.props.form.getDataItem(this.props.extend, true)
  }

  _resolveItemList = () => {
    let itemList = this.props.dataProvider

    if (this.props.extend) {
      itemList = this.props.form.getDataItem(this.props.extend, true)
    }

    if (!itemList) {
      itemList = []
    }
    return itemList
  }

  render() {
    let itemList = this._resolveItemList()

    if (Platform.OS !== 'ios' && !this._getValue()) {
      let itemEmpty = { id: -1 }
      itemEmpty[this.props.labelField] = this._getPrompt()
      itemList = [].concat.apply(itemEmpty, itemList)
    }

    return (
      <Item stackedLabel>
        <Label>{this.props.label}</Label>
        <Picker
          getRef={me => (this.input = me)}
          iosHeader="Selecione"
          placeholder={this._getPrompt()}
          mode="dialog"
          style={{ width: '100%' }}
          headerBackButtonText="Voltar"
          selectedValue={this._getValue()}
          onValueChange={this.onChange}
          enabled={this._enabled()}
          renderButton={this.monkeyPatchEnabledIos}
        >
          {itemList.map(item => (
            <Picker.Item
              key={this._getId(item)}
              label={this._renderText(item)}
              value={this._getId(item)}
            />
          ))}
        </Picker>
      </Item>
    )
  }

  monkeyPatchEnabledIos = ({ onPress, text, picker, selectedItem }) => {
    return (
      <Button
        style={{backgroundColor: 'transparent'}}
        dark
        picker
        transparent
        onPress={onPress}
        disabled={!picker.props.enabled}
      >
        {selectedItem ? (
          <Text>
            {text}
          </Text>
        ) : (
          <Text
            style={[picker.props.textStyle, picker.props.placeholderStyle]}
            note={picker.props.note === false ? false : true}
          >
            {picker.props.placeholder}
          </Text>
        )}
      </Button>
    )
  }
}
