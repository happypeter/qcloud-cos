import React, { Component } from 'react'
import './dir-setter.css'
import { message, Button, Input } from 'antd'

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
        this.props.setNewDir(dir)
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
      <div className='dir-setter'>
        <Input value={this.state.inputDir}
        onChange={this.handleChange} />
        <Button type="primary"
          onClick={this.submitDir}>
          { !this.props.newDir ? '添加新文件夹' : '修改文件夹名' }
        </Button>
      </div>
    )
  }
}


export default DirSetter
