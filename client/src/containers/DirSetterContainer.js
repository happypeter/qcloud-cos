import React, { Component } from 'react'
import DirSetter from '../components/DirSetter'

class DirSetterContainer extends Component {

  render () {
    const { dirNames } = this.props
    return (
      <div className='DirSetterContainer'>
        <DirSetter dirNames={dirNames}
          selectDir={this.props.selectDir}
          appendDirName={this.props.appendDirName}
        />
      </div>
    )
  }
}

export default DirSetterContainer
