import React, { Component } from 'react'
import { Upload, Icon } from 'antd'
const Dragger = Upload.Dragger


class Uploader extends Component {

  render () {
    const params = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      onChange: this.props.onChange
    }
    return (
      <div>
        <Dragger {...params}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">拖拽到此区域上传</p>
        </Dragger>
      </div>
    )
  }
}

export default Uploader
