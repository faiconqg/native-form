import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form as NativeForm } from 'native-base'

export default class Form extends Component {
  inputs = {}
  ext = {}
  exp = {}

  static propTypes = {
    children: PropTypes.any,
    dataProvider: PropTypes.any,
    dummyObject: PropTypes.any,
  }

  get dataProvider() {
    return this.props.dataProvider
  }

  state = {
    children: []
  }

  static defaultProps = {
    dummyObject: {},
    dataProvider: {}
  }

  getDataItem = (key, dummy) => {
    if (dummy) {
      // Se estiver carregando o dataProvider e o objeto ainda não existir
      if (!this.props.dummyObject[key] && this.exp[key]) {
        this.exp[key]._refreshExport(false)
      }
      if (!this.props.dummyObject[key]) {
        return null
      }
      return this.props.dummyObject[key]
    } else {
      if (!this.props.dataProvider[key]) {
        return null
      }
      return this.props.dataProvider[key]
    }
  }

  setDataItem = (value, key, dummy, update = true) => {
    if (dummy) {
      this.props.dummyObject[key] = value
      if (this.ext[key] && update) {
        this.ext[key].forceUpdate()
      }
    } else {
      this.props.dataProvider[key] = value
    }
  }

  attachInput = child => {
    this.inputs[child.props.index] = child
    if (child.props.extend) {
      this.ext[child.props.extend] = child
    }
    if (child.props.export) {
      this.exp[child.props.export] = child
    }
  }

  getNextItem = child => {
    const index = child.props.index
    if (index + 1 < this.state.children.length) {
      return this.inputs[index + 1]
    } else {
      return null
    }
  }

  render() {
    return (
      <NativeForm style={{ alignSelf: 'stretch' }}>
        {React.Children.map(this.props.children,
            (child, index) => React.cloneElement(child, {key: index, index: index, form: this}))}
      </NativeForm>
    )
  }
}
