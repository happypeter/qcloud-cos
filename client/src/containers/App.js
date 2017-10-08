import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import DirSetterContainer from './DirSetterContainer'

class App extends Component {
  state = {
    selectedDir: ''
  }

  selectDir = (dirName) => {
    console.log('selectDir', dirName)
    this.setState({
      selectedDir: dirName
    })
  }
  render() {
    return (
      <div>
        <DirSetterContainer selectDir={this.selectDir}/>
        <UploaderContainer selectedDir={this.state.selectedDir}/>
      </div>
    )
  }
}

export default App
