import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import DirSetterContainer from './DirSetterContainer'
import FileTableContainer from './FileTableContainer'
import axios from 'axios'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import { loadAllFiles } from '../redux/actions'
import {
  selectDir,
  setDirNames,
  setActiveKey
} from '../redux/actions'
const TabPane = Tabs.TabPane;



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



  handleTabClick = (key) => {
    const selectedDir =  this.props.dirNames[key]
    this.props.selectDir(selectedDir)
    this.props.setActiveKey(key)
  }

  render() {
    const { dirNames, activeKey } = this.props
    console.log('APP.js', activeKey)
    return (
      <div>
        <DirSetterContainer />

        <Tabs
          activeKey={activeKey}
          tabPosition={'top'}
          onTabClick={this.handleTabClick}
        >
          {
            dirNames.map(
              (t, i) => (
                <TabPane tab={t} key={i}>
                          <UploaderContainer />
                          <FileTableContainer />
                </TabPane>
              )
            )
          }
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: state.selectedDir,
  dirNames: state.dirNames,
  activeKey: state.activeKey
})

export default connect(mapStateToProps,
  {
    selectDir,
    setDirNames,
    setActiveKey,
    loadAllFiles
  })(App)
