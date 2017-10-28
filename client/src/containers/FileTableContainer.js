import React, { Component } from 'react'
import FileTable from '../components/FileTable'
import { connect } from 'react-redux'
import { removeFile } from '../redux/actions'
import {
  getSelectedDirFiles
} from '../redux/reducers'

class FileTableContainer extends Component {

  handleDelete = (record) => this.props.removeFile(record)

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
  removeFile
}
)(FileTableContainer)
