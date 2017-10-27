import React, { Component } from 'react'
import cos from '../lib/qcloud'
import { message } from 'antd'
import Uploader from '../components/Uploader'
import Settings from '../settings'
import { connect } from 'react-redux'
import { loadAllFiles } from '../redux/actions'
import { getSelectedDir } from '../redux/reducers'

class UploaderContainer extends Component {
  state = {
    progressBars: []
  }

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      const { selectedDir } = this.props
      if (!selectedDir) {
        return message.error('请先选择文件夹')
      }
      const file = info.file.originFileObj

      let progressBar = {
             percent: 0,
             name: file.name,
             status: 'normal',
             uid: file.uid
           }

      this.setState({
        progressBars: [...this.state.progressBars, progressBar]
      })

      const key = `${selectedDir}/${file.name}`
      const params = {
        Bucket: Settings.Bucket,
        Region: Settings.Region,
        Key: key,
        Body: file,
        onProgress: progressData => {
          const percent = progressData.percent*100
          this.setState({
            progressBars: this.state.progressBars.map(t => {
              if (t.uid === file.uid) {
                const status = percent < 100 ? 'active' : 'success'
                return { ...t, status, percent}
              }
              return t
            })
          })
        }
      }
      cos.sliceUploadFile(params, (err, data) => {
        if (err) {
          this.setState({
            progressBars: this.state.progressBars.map(t => {
              if (t.uid === file.uid) {
                const status =  'exception'
                return { ...t, status}
              }
              return t
            })
          })
          message.info(`${file.name} 上传失败`)
        } else {
          message.success(`${file.name} 成功上传`)
          this.props.loadAllFiles()
        }
      })
    }
  }
  render () {
    const { progressBars } = this.state
    return (
      <div>
        <Uploader onChange={this.onChange} progressBars={progressBars}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: getSelectedDir(state)
})

export default connect(mapStateToProps, {
  loadAllFiles
})(UploaderContainer)
