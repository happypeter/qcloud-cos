import React, { Component } from 'react'
import DirTabsContainer from '../containers/DirTabsContainer'
import DirSetterContainer from '../containers/DirSetterContainer'
import styled from 'styled-components'
import Settings from '../settings'


const MainWrap = styled.div`
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`

const Wrap = styled.div`
  background-color: #fff;
  width: 95%;
  margin: 20px auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  padding: 20px;
`

class Main extends Component {

  render() {
    return (
      <MainWrap>
        <Wrap>
          <h1>Bucket: {Settings.Bucket}</h1>
        </Wrap>
        <Wrap>
          <DirSetterContainer />
        </Wrap>
        <Wrap>
          <DirTabsContainer />
        </Wrap>
      </MainWrap>
    )
  }
}


export default Main
