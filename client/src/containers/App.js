import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from '../components/Main'
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
        <Main />
      </div>
    )
  }
}

export default connect(null,
  {
    loadAllFiles
  })(App)
