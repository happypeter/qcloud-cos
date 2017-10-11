import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import DirSetterContainer from './DirSetterContainer'
import FileTableContainer from './FileTableContainer'
import axios from 'axios'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;



class App extends Component {
  state = {
    selectedDir: '',
    dirNames: []
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

  handleTabClick = (key) => {

    this.setState({
      selectedDir: this.state.dirNames[key]
    })
  }

  render() {
    const { dirNames } = this.state
    return (
      <div>
        <DirSetterContainer
          appendDirName={this.appendDirName}
          dirNames={dirNames} />

        <Tabs
          defaultActiveKey="1"
          tabPosition={'top'}
          onTabClick={this.handleTabClick}
        >
          {
            dirNames.map(
              (t, i) => (
                <TabPane tab={t} key={i}>
                          <UploaderContainer selectedDir={this.state.selectedDir} />
                          <FileTableContainer selectedDir={this.state.selectedDir} />
                </TabPane>
              )
            )
          }
        </Tabs>



      </div>
    )
  }
}

export default App
