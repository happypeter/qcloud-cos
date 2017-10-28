import React, { Component } from 'react'
import UploaderContainer from '../containers/UploaderContainer'
import FileTableContainer from '../containers/FileTableContainer'
import { Tabs } from 'antd'
import styled from 'styled-components'
const TabPane = Tabs.TabPane;


const DirTabsWrap = styled.div`
  margin: 20px auto;
  max-width: 95%;
`

const Wrap = styled.div`
  margin-top: 20px;
`

class DirTabs extends Component {

  handleTabClick = (key) => {
    this.props.setActiveKey(key)
  }

  render() {
    const { tabDirNames, activeKey } = this.props
    return (
      <DirTabsWrap>
        <Tabs
          activeKey={activeKey}
          tabPosition={'top'}
          onTabClick={this.handleTabClick}
        >
          {
            tabDirNames.map(
              (t, i) => (
                <TabPane tab={t} key={i}>
                  <Wrap>
                    <UploaderContainer />
                  </Wrap>
                  <Wrap>
                    <FileTableContainer />
                  </Wrap>
                </TabPane>
              )
            )
          }
        </Tabs>
      </DirTabsWrap>
    )
  }
}


export default DirTabs
