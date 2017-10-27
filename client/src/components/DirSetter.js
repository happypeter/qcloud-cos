import React, { Component } from 'react'
import './dir-setter.css'
import { message } from 'antd'

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
        <input value={this.state.inputDir}
        onChange={this.handleChange} />
        <button onClick={this.submitDir}>
          { !this.props.newDir ? '添加新文件夹' : '修改文件夹名' }
        </button>
        <div className='input-requirement'>
        可用数字、中英文、下划线组合，最多20个字符
        </div>
      </div>
    )
  }
}


export default DirSetter
