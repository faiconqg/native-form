import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Item,
  Input,
  Label,
  List,
  ListItem,
  CheckBox,
  Text
} from 'native-base'

export default class RadioGroup extends Component {
  static propTypes = {
    form: PropTypes.object,
    dataField: PropTypes.string,
    label: PropTypes.any,
    description: PropTypes.string,
    firstOption: PropTypes.any,
    secondOption: PropTypes.any,
  }

  state = {
    value: null
  }

  _onPress = option => {
    this.setState({ value: option.value })
    this.props.form.setDataItem(option.value, this.props.dataField)
  }

  render() {
    return (
      <Item style={{ marginTop: 20 }}>
        <Label>{this.props.label}</Label>
        <Input editable={false} />
        <List style={{ flexDirection: 'row' }}>
          <ListItem
            style={{ backgroundColor: '#E9E9EF', borderColor: 'transparent' }}
          >
            <CheckBox
              onPress={() => this._onPress(this.props.firstOption)}
              checked={this.state.value === this.props.firstOption.value}
            />
            <Text> {this.props.firstOption.label}</Text>
          </ListItem>

          <ListItem
            style={{ backgroundColor: '#E9E9EF', borderColor: 'transparent' }}
          >
            <CheckBox
              onPress={() => this._onPress(this.props.secondOption)}
              checked={this.state.value === this.props.secondOption.value}
            />
            <Text> {this.props.secondOption.label}</Text>
          </ListItem>
        </List>
      </Item>
    )
  }
}
