import React, { Component } from 'react'
import { message, Button, Input } from 'antd'
import styled from 'styled-components'

const DirSetterWrap = styled.div`
  display: flex;
`

class DirSetter extends Component {
  state = {
    inputDir: ''
  }

  handleChange = (e) => {
    let inputDir = e.target.value
    this.setState({
      inputDir
    })
  }

  submitDir = (e) => {
    e.preventDefault()
    const { inputDir } = this.state
    const dir = inputDir.trim()
    const parseName = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
    if (parseName.test(dir)) {
      if (this.props.tabDirNames.indexOf(dir) === -1) {
        this.props.onAddNewDir(dir)
        message.success('文件夹创建成功')
        this.setState({
          inputDir: ''
        })
      } else {
        message.error('文件夹已经存在')
      }
    }
    else {
      message.error('仅支持数字、中英文、下划线')
    }
  }

  render () {
    return (
      <DirSetterWrap>
        <Input value={this.state.inputDir}
        onChange={this.handleChange} />
        <Button type="primary"
          onClick={this.submitDir}>
          { !this.props.newDir ? '添加新文件夹' : '修改文件夹名' }
        </Button>
      </DirSetterWrap>
    )
  }
}


export default DirSetter
