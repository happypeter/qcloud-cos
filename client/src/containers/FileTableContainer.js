import React, { Component } from 'react'
import FileTable from '../components/FileTable/FileTable'
import Settings from '../settings'
import cos from '../lib/qcloud'
import { connect } from 'react-redux'
import { removeFromAllFiles } from '../redux/actions'
import {
  getSelectedDirFiles
} from '../redux/reducers'

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
    return (
      <div>
        <FileTable
          onDelete={this.handleDelete}
          selectedDirFiles={this.props.selectedDirFiles}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedDirFiles: getSelectedDirFiles(state)
})

export default connect(mapStateToProps, {
  removeFromAllFiles
}
)(FileTableContainer)
