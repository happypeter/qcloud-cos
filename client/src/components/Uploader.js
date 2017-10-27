import React, { Component } from 'react'
import { Upload, Icon, Progress } from 'antd'
import styled from 'styled-components'
const Dragger = Upload.Dragger

const UploaderWrap = styled.div`
  padding: 10px;
`

class Uploader extends Component {

  render () {
    const params = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      onChange: this.props.onChange
    }
    return (
      <UploaderWrap>
        <Dragger {...params}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">拖拽到此区域上传</p>
        </Dragger>
        {
          this.props.progressBars.map(
            t => {
              return (
                <div key={t.uid}>
                  {t.name}
                  <Progress percent={t.percent} status={t.status} />
                </div>
              )
            }
          )
        }
      </UploaderWrap>
    )
  }
}

export default Uploader
