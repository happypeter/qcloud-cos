import React, { Component } from 'react'
import FileTable from '../components/FileTable/FileTable'
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
      Region: Settings.Region,
      Key : record.Key
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

  render () {
    const { allFiles } = this.props
    const currentDirFiles = allFiles.filter(
      t => {
        return t.Key.split('/')[0] === this.props.selectedDir
      }
    )
    return (
      <div>
        <FileTable
          onDelete={this.handleDelete}
          currentDirFiles={currentDirFiles}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDir: state.selectedDir,
  allFiles: state.allFiles
})

export default connect(mapStateToProps)(FileTableContainer)
