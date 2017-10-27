import React, { Component } from 'react'
import DirTabsContainer from '../containers/DirTabsContainer'
import DirSetterContainer from '../containers/DirSetterContainer'
import './main.css'


class Main extends Component {

  render() {
    return (
      <div className='main'>
        <div className='block-wrap'>
          <DirSetterContainer />
        </div>
        <div className='block-wrap'>
          <DirTabsContainer />
        </div>
      </div>
    )
  }
}


export default Main
