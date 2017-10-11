import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
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
       this.props.onDelete(record)
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
      key: 'Key'
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
    const { paths } = this.props
    const files = paths.map( t => {
      return { ...t, Key: t.Key.split('/')[1] }
    })
    return (
      <div className='file-table'>
        <Table columns={this.tableColumns}
          dataSource={files}
          rowKey={item => item.ETag}
          />
      </div>
    )
  }
}

export default FileTable
