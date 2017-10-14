import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import DirSetterContainer from './DirSetterContainer'
import FileTableContainer from './FileTableContainer'
import axios from 'axios'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import { selectDir, setDirNames } from '../redux/actions'
const TabPane = Tabs.TabPane;



class App extends Component {
  state = {
    activeKey: '1'
  }


  componentDidMount () {
    axios.get(`http://localhost:3008/bucket`).then(
      res => {
        const { Contents } = res.data
        this.props.setDirNames(Contents)
        const selectedDir = this.props.dirNames[this.state.activeKey]
        this.props.selectDir(selectedDir)
      }
    )
  }

  appendDirName = (dirName) => {
    const { dirNames } = this.state
    if (dirNames.indexOf(dirName) === -1) {
      this.setState({
        dirNames: [...dirNames, dirName]
      })
    } else {
      console.log('文件夹名已经存在！')
    }
  }

  handleTabClick = (key) => {
    const selectedDir =  this.state.dirNames[key]
    this.props.selectDir(selectedDir)
    this.setState({
      activeKey: key
    })
  }

  render() {
    const { activeKey } = this.state
    const { dirNames } = this.props
    console.log('selectedDir+++', this.props.selectedDir)
    return (
      <div>
        <DirSetterContainer
          appendDirName={this.appendDirName}
          dirNames={dirNames} />

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
  selectedDir: state.selectedDir
})

export default connect(mapStateToProps, { selectDir, setDirNames })(App)
