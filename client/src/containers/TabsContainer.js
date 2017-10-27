import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import FileTableContainer from './FileTableContainer'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import {
  selectDir,
  setActiveKey
} from '../redux/actions'
import {
  getTabDirNames
} from '../redux/reducers'
const TabPane = Tabs.TabPane;


class TabsContainer extends Component {

  handleTabClick = (key) => {
    const selectedDir =  this.props.dirNames[key]
    this.props.selectDir(selectedDir)
    this.props.setActiveKey(key)
  }

  render() {
    const { tabDirNames, activeKey } = this.props
    console.log('APP.js', activeKey)
    return (
      <div>
        <Tabs
          activeKey={activeKey}
          tabPosition={'top'}
          onTabClick={this.handleTabClick}
        >
          {
            tabDirNames.map(
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
  tabDirNames: getTabDirNames(state),
  activeKey: state.activeKey
})

export default connect(mapStateToProps,
  {
    selectDir,
    setActiveKey
  })(TabsContainer)
