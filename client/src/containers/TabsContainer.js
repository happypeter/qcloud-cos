import React, { Component } from 'react'
import UploaderContainer from './UploaderContainer'
import FileTableContainer from './FileTableContainer'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import { setActiveKey } from '../redux/actions'
import {
  getTabDirNames,
  getSelectedDir
} from '../redux/reducers'
const TabPane = Tabs.TabPane;


class TabsContainer extends Component {

  handleTabClick = (key) => {
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
  selectedDir: getSelectedDir(state),
  tabDirNames: getTabDirNames(state),
  activeKey: state.activeKey
})

export default connect(mapStateToProps,
  {
    setActiveKey
  })(TabsContainer)
