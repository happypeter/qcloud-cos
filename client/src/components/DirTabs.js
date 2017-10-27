import React, { Component } from 'react'
import UploaderContainer from '../containers/UploaderContainer'
import FileTableContainer from '../containers/FileTableContainer'
import { Tabs } from 'antd';
import './dir-tabs.css'
const TabPane = Tabs.TabPane;


class DirTabs extends Component {

  handleTabClick = (key) => {
    this.props.setActiveKey(key)
  }

  render() {
    const { tabDirNames, activeKey } = this.props
    return (
      <div className='dir-tabs'>
        <Tabs
          activeKey={activeKey}
          tabPosition={'top'}
          onTabClick={this.handleTabClick}
        >
          {
            tabDirNames.map(
              (t, i) => (
                <TabPane tab={t} key={i}>
                  <div className='tab-pane-inner'>
                    <UploaderContainer />
                    <FileTableContainer />
                  </div>
                </TabPane>
              )
            )
          }
        </Tabs>
      </div>
    )
  }
}


export default DirTabs
