import Settings from '../../settings'
import axios from 'axios'
import cos from '../../lib/qcloud'



export const loadAllFiles = () => {
  return dispatch => {
    axios.get(Settings.bucketUrl).then(
      res => {
        const allFiles = res.data.Contents
        dispatch({ type: 'LOAD_ALL_FILES', allFiles })
      }
    )
  }
}

export const addFile = (filePath) => {
  return dispatch => {
    axios.get(Settings.bucketUrl).then(
      res => {
        const newFile = res.data.Contents.find(
          t => t.Key === filePath
        )
        dispatch({ type: 'ADD_FILE', newFile })
      }
    )
  }
}

export const removeFile = (record) => {
  const delParams = {
    Bucket: Settings.Bucket,
    Region: Settings.Region,
    Key : record.Key
  }
  const key = record.Key

  return dispatch => {
    return new Promise(
      (resolve, reject) => {
        cos.deleteObject(delParams, (err, data) => {
          if(err) {
            reject(key)
          } else {
            dispatch({ type: 'REMOVE_FILE', key })
            resolve(key)
          }
        })
      }
    )
  }
}

export const setNewDir = (newDir) => {
  return dispatch => {
    dispatch({
      type: 'SET_NEW_DIR',
      newDir
    })
  }
}

export const setActiveKey = (activeKey) => {
  return dispatch => {
    dispatch({
      type: 'SET_ACTIVE_KEY',
      activeKey
    })
  }
}
