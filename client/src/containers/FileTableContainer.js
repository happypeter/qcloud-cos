import React, { Component } from 'react'
import FileTable from '../components/FileTable/FileTable'
import axios from 'axios'
import Settings from '../settings'
import { message } from 'antd'
import cos from '../lib/qcloud'

class FileTableContainer extends Component {
  state = {
    paths: []
  }

  handleDelete = (record) => {
    console.log('OK', record)
    const delParams = {
      Bucket: 'hq123',
      Region: 'ap-chengdu',                     /* 必须 */
      Key : record.Key                                  /* 必须 */
    }

    cos.deleteObject(delParams, (err, data) => {
      if(err) {
        message.error(`${record.Key} 删除失败`)
      } else {
        message.success(`已删除：${record.Key}`)
        this.setState({
          files: this.state.files.filter(
            t => t.ETag !== record.ETag
          )
        })
       }
     })
  }

  componentDidMount () {
    axios.get(Settings.bucketUrl).then(
      res => {
        const paths = res.data.Contents
        this.setState({
          paths
        })
      }
    )
  }
  render () {
    const paths = this.state.paths.filter(
      t => {
        return t.Key.split('/')[0] === this.props.selectedDir
      }
    )
    return (
      <div>
        <FileTable
          onDelete={this.handleDelete}
          paths={paths}/>
      </div>
    )
  }
}

export default FileTableContainer
