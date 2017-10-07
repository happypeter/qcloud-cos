import React, { Component } from 'react'
import axios from 'axios'
import COS from 'cos-js-sdk-v5'
import { message } from 'antd'
import Uploader from '../components/Uploader'
import Settings from '../settings'

//腾讯 cos js-sdk 配置
const getAuthorization = (options, callback) => {
    axios.post(Settings.authUrl, options)
    .then(
      res => {
        console.log(res.data)
        const authorization = res.data
        callback(authorization);
      }
    )
    .catch(err => {
      if (err) {
        console.log(err)
      }
    })
}

const cos = new COS({
  AppId: Settings.AppId,                            /* 必须 */
  getAuthorization: getAuthorization,                   /* 必须 */
})

// js-sdk 配置部分至此


class UploaderContainer extends Component {
  state = {
    progressBars: []
  }

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
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

      const params = {
        Bucket: Settings.Bucket,
        Region: Settings.Region,
        Key: file.name,
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

export default UploaderContainer
