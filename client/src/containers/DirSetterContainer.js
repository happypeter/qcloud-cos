import React, { Component } from 'react'
import DirSetter from '../components/DirSetter'
import { setNewDir } from '../redux/actions'
import { connect } from 'react-redux'
import {
  getTabDirNames
} from '../redux/reducers'

class DirSetterContainer extends Component {

  setNewDir = (dir) => {
    const { tabDirNames } = this.props
    if (tabDirNames.indexOf(dir) === -1) {
      this.props.setNewDir(dir)
    } else {
      console.log('文件夹已经存在！')
    }
  }

  render () {
    return (
      <div className='DirSetterContainer'>
        <DirSetter setNewDir={this.setNewDir}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tabDirNames: getTabDirNames(state)
})

export default connect(mapStateToProps, { setNewDir })(DirSetterContainer)
