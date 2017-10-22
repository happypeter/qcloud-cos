import React, { Component } from 'react'
import FileTable from '../components/FileTable/FileTable'
import Settings from '../settings'
import cos from '../lib/qcloud'
import { connect } from 'react-redux'
import { removeFromAllFiles } from '../redux/actions'

class FileTableContainer extends Component {
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
            this.props.removeFromAllFiles(record.Key)
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

export default connect(mapStateToProps, {
  removeFromAllFiles
}
)(FileTableContainer)
