import React, { Component } from 'react'
import DirSetter from '../components/DirSetter'
import { addDirName } from '../redux/actions'
import { connect } from 'react-redux'

class DirSetterContainer extends Component {

  appendDirName = (dirName) => {
    const { dirNames } = this.props
    if (dirNames.indexOf(dirName) === -1) {
      this.props.addDirName(dirName)
    } else {
      console.log('文件夹名已经存在！')
    }
  }

  render () {
    return (
      <div className='DirSetterContainer'>
        <DirSetter appendDirName={this.appendDirName}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dirNames: state.dirNames
})

export default connect(mapStateToProps, {
  addDirName
})(DirSetterContainer)
