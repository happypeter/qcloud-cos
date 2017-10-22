import React, { Component } from 'react'
import { Table, Button, Modal, message } from 'antd'
import moment from 'moment'
const confirm = Modal.confirm

class FileTable extends Component {
  delete = (record) => {
    confirm({
      title: `确认删除 ${record.Key} ？`,
      content: '删除之后无法恢复',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.onDelete(record).then(
          key => message.success(`已删除：${key}`)
        ).catch(
          key => message.error(`${key} 删除失败`)
        )
      },
      onCancel: () => {
        console.log('Cancel')
      }
    })
  }

  tableColumns = [
    {
      // title: '名称',
      dataIndex: 'Key',
      key: 'Key',
      render: (text) => {
        return <h1>{text.split('/').pop()}</h1>
      }
    },
    {
      // title: '更新时间',
      dataIndex: 'LastModified',
      key: 'LastModified',
      render: (text) => {
        return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
      }
    },
    {
      // title: '操作',
      render: record => {
        return (
          <Button
            onClick={() => this.delete(record) }
          >
            删除
          </Button>)
       }
    }
  ]
  render () {
    const { currentDirFiles } = this.props

    return (
      <div className='file-table'>
        <Table columns={this.tableColumns}
          dataSource={currentDirFiles}
          rowKey={item => item.ETag}
          />
      </div>
    )
  }
}


export default FileTable
