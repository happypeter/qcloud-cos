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

const StyledTabPane = styled(TabPane)`
  padding: 20px;
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
                <StyledTabPane tab={t} key={i}>
                  <Wrap>
                    <UploaderContainer />
                  </Wrap>
                  <Wrap>
                    <FileTableContainer />
                  </Wrap>
                </StyledTabPane>
              )
            )
          }
        </Tabs>
      </DirTabsWrap>
    )
  }
}


export default DirTabs
