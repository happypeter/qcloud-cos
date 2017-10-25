import React, { Component } from 'react'
import TabsContainer from './TabsContainer'
import DirSetterContainer from './DirSetterContainer'
import { connect } from 'react-redux'
import {
  loadAllFiles
} from '../redux/actions'


class App extends Component {

  componentDidMount () {
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
  dirNames: state.dirNames
})

export default connect(mapStateToProps,
  {
    loadAllFiles
  })(App)
