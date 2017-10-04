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

//antd 拖拽部分
const onChange = (info) => {
  if (info.file.status !== 'uploading') {
    // 由于 dragger 的 action 一项没有传，所以最终的
    // info.file.status 的值会为 error 。
    // onChange 一共会被执行三次，前两次时 status 都是 uploading
    const file = info.file.originFileObj
    const params = {
      Bucket: Settings.Bucket,
      Region: Settings.Region,
      Key: file.name,
      Body: file,
    }
    cos.sliceUploadFile(params, function(err, data) {
      if(err) {
        message.info(`${file.name} 上传失败`)
      } else {
        message.success(`${file.name} 成功上传`)
      }
    })
  }
}

class UploaderContainer extends Component {
  render () {
    return (
      <div>
        <Uploader onChange={onChange} />
      </div>
    )
  }
}

export default UploaderContainer
