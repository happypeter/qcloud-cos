import React, { Component } from 'react'
import './dir-setter.css'
import { message } from 'antd'

class DirSetter extends Component {

  state = {
    selectedDir: '',
    inputDir: ''
  }

  handleClick = (dirName) => {
    this.props.selectDir(dirName)
    this.setState({
      selectedDir: dirName
    })
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
      this.props.selectDir(dir)
      this.props.appendDirName(dir)
      this.setState({
        selectedDir: dir,
        inputDir: ''
      })
    }
    else {
      message.error('仅支持数字、中英文、下划线')
    }
  }

  render () {
    const { dirNames } = this.props
    const { selectedDir } = this.state
    const dirList = dirNames.map( t => {
      return (
        <div className={selectedDir === t ? 'active': 'normal'}
          onClick={() => this.handleClick(t) }
          key={t}>
          {t}
        </div>
      )
    })
    let dirNameStr = (<div className='dir'>
    视频会被上传到 {selectedDir}/ 中
    </div>)
    return (
      <div className='dir-setter'>
        <div className='dir-list'>
          {dirList}
        </div>
        <input value={this.state.inputDir}
        onChange={this.handleChange} />
        <button onClick={this.submitDir}>添加新文件夹</button>
        <div className='input-requirement'>
        可用数字、中英文、下划线组合，最多20个字符
        </div>
        {selectedDir && dirNameStr}
      </div>
    )
  }
}

export default DirSetter
