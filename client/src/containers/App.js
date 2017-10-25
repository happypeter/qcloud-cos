import React, { Component } from 'react'
import TabsContainer from './TabsContainer'
import DirSetterContainer from './DirSetterContainer'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadAllFiles } from '../redux/actions'
import {
  selectDir,
  setDirNames
} from '../redux/actions'


class App extends Component {

  componentDidMount () {
    axios.get(`http://localhost:3008/bucket`).then(
      res => {
        const { Contents } = res.data
        this.props.setDirNames(Contents)
        const selectedDir = this.props.dirNames[this.props.activeKey]
        this.props.selectDir(selectedDir)
      }
    )
    this.props.loadAllFiles()
  }



  render() {
    return (
      <div>
        <DirSetterContainer />
        <TabsContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: state.selectedDir,
  dirNames: state.dirNames
})

export default connect(mapStateToProps,
  {
    selectDir,
    setDirNames,
    loadAllFiles
  })(App)
