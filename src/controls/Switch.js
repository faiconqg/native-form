import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  List,
  ListItem,
  Body,
  Right,
  Switch as NativeSwitch
} from 'native-base'

export default class Switch extends Component {
  static propTypes = {
    form: PropTypes.object,
    dataField: PropTypes.string,
    title: PropTypes.any,
    description: PropTypes.any,
  }

  state = {
    isSelected: false
  }

  _handleSelection = () => {
    this.props.form.setDataItem(this.state.isSelected, this.props.dataField)
    this.setState({ isSelected: !this.state.isSelected })
  }

  render() {
    return (
      <List>
        <ListItem>
          <Body>
            <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
            <Text>{this.props.description}</Text>
          </Body>
          <Right>
            <NativeSwitch
              onValueChange={this._handleSelection}
              value={this.state.isSelected}
            />
          </Right>
        </ListItem>
      </List>
    )
  }
}
