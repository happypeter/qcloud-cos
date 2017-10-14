import React, { Component } from 'react'
import './dir-setter.css'
import { message } from 'antd'
import { connect } from 'react-redux'
import { selectDir } from '../redux/actions'

class DirSetter extends Component {

  state = {
    inputDir: ''
  }

  handleClick = (selectedDir) => {
    // this.props.selectDir(dirName)
    // this.setState({
    //   selectedDir: dirName
    // })
    this.props.selectDir(selectedDir)
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
        inputDir: ''
      })
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
        <button onClick={this.submitDir}>添加新文件夹</button>
        <div className='input-requirement'>
        可用数字、中英文、下划线组合，最多20个字符
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: state.selectedDir
})

export default connect(mapStateToProps, { selectDir })(DirSetter)
