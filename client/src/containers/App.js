import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import DirSetterContainer from './DirSetterContainer'
import FileTableContainer from './FileTableContainer'
import axios from 'axios'


class App extends Component {
  state = {
    selectedDir: '',
    dirNames: []
  }

  selectDir = (dirName) => {
    console.log('selectDir', dirName)
    this.setState({
      selectedDir: dirName
    })
  }


  componentDidMount () {
    axios.get(`http://localhost:3008/bucket`).then(
      res => {
        const { Contents } = res.data
        this.setState({
          dirNames: Contents.reduce((arr, t) => {
            const dirName = t.Key.split('/')[0]
            if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
            return arr
          }, [])
        })
      }
    )
  }

  appendDirName = (dirName) => {
    const { dirNames } = this.state
    if (dirNames.indexOf(dirName) === -1) {
      this.setState({
        dirNames: [...dirNames, dirName]
      })
    }
  }

  render() {
    return (
      <div>
        <DirSetterContainer
          appendDirName={this.appendDirName}
          dirNames={this.state.dirNames}
          selectDir={this.selectDir} />
        <UploaderContainer selectedDir={this.state.selectedDir} />
        <FileTableContainer selectedDir={this.state.selectedDir} />
      </div>
    )
  }
}

export default App
