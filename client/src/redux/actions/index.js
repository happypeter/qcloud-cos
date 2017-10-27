import Settings from '../../settings'
import axios from 'axios'


export const selectDir = (selectedDir) => {
  return dispatch => {
    dispatch({ type: 'SELETCT_DIR', selectedDir})
  }
}


export const loadAllFiles = () => {
  return dispatch => {
    axios.get(Settings.bucketUrl).then(
      res => {
        const allFiles = res.data.Contents
        console.log('loadAllFiles++++allFiles', allFiles)
        dispatch({ type: 'LOAD_ALL_FILES', allFiles })
      }
    )
  }
}

export const removeFromAllFiles = (key) => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_FROM_ALL_FILES',
      key
    })
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
