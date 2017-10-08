import React, { Component } from 'react'
import axios from 'axios'
import DirSetter from '../components/DirSetter'

class DirSetterContainer extends Component {
  state = {
    dirNames: []
  }

  appendDirName = (dirName) => {
    const { dirNames } = this.state
    if (dirNames.indexOf(dirName) === -1) {
      this.setState({
        dirNames: [...dirNames, dirName]
      })
    }
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

  render () {
    const { dirNames } = this.state
    console.log('dirNames', dirNames)
    return (
      <div className='DirSetterContainer'>
        <DirSetter dirNames={dirNames}
          selectDir={this.props.selectDir}
          appendDirName={this.appendDirName}
        />
      </div>
    )
  }
}

export default DirSetterContainer
