import React, { Component } from 'react'
import DirTabs from '../components/DirTabs.js'
import { connect } from 'react-redux'
import { setActiveKey } from '../redux/actions'
import {
  getTabDirNames,
  getSelectedDir,
  getActiveKey
} from '../redux/reducers'


class DirTabsContainer extends Component {

  handleTabClick = (key) => {
    this.props.setActiveKey(key)
  }

  render() {
    const { tabDirNames, activeKey } = this.props
    return (
      <div>
        <DirTabs
          setActiveKey={this.handleTabClick}
          tabDirNames={tabDirNames}
          activeKey={activeKey}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: getSelectedDir(state),
  tabDirNames: getTabDirNames(state),
  activeKey: getActiveKey(state)
})

export default connect(mapStateToProps,
  {
    setActiveKey
  })(DirTabsContainer)
