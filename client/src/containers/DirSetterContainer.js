import React, { Component } from 'react'
import DirSetter from '../components/DirSetter'
import { setNewDir } from '../redux/actions'
import { connect } from 'react-redux'
import {
  getTabDirNames,
  getNewDir
} from '../redux/reducers'

class DirSetterContainer extends Component {

  addNewDir = (dir) => {
    this.props.dispatch(setNewDir(dir))
  }

  render () {
    const { tabDirNames } = this.props
    return (
      <div className='DirSetterContainer'>
        <DirSetter onAddNewDir={this.addNewDir}
          newDir={this.props.newDir}
          tabDirNames={tabDirNames}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tabDirNames: getTabDirNames(state),
  newDir: getNewDir(state)
})

export default connect(mapStateToProps)(DirSetterContainer)
