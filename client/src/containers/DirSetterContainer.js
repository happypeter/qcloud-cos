import React, { Component } from 'react'
import DirSetter from '../components/DirSetter'
import { setNewDir } from '../redux/actions'
import { connect } from 'react-redux'
import {
  getTabDirNames,
  getNewDir
} from '../redux/reducers'

class DirSetterContainer extends Component {

  render () {
    const { tabDirNames, setNewDir } = this.props
    return (
      <div className='DirSetterContainer'>
        <DirSetter setNewDir={setNewDir}
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

export default connect(mapStateToProps, { setNewDir })(DirSetterContainer)
