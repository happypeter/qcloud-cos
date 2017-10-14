import React, { Component } from 'react'
import FileTable from '../components/FileTable/FileTable'
import axios from 'axios'
import Settings from '../settings'
import cos from '../lib/qcloud'
import { connect } from 'react-redux'

class FileTableContainer extends Component {
  state = {
    paths: []
  }

  handleDelete = (record) => {
    const delParams = {
      Bucket: Settings.Bucket,
      Region: Settings.Region,                     /* 必须 */
      Key : record.Key                                  /* 必须 */
    }
    return new Promise(
      (resolve, reject) => {
        cos.deleteObject(delParams, (err, data) => {
          if(err) {
            reject(record.Key)
          } else {
            this.setState({
              paths: this.state.paths.filter(
                t => t.ETag !== record.ETag
              )
            })
            resolve(record.Key)
           }
         })
      }
    )
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

const mapStateToProps = (state) => ({
  selectedDir: state.selectedDir
})

export default connect(mapStateToProps)(FileTableContainer)
