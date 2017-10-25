import Settings from '../../settings'
import axios from 'axios'


export const selectDir = (selectedDir) => {
  return dispatch => {
    dispatch({ type: 'SELETCT_DIR', selectedDir})
  }
}

export const setDirNames = (contents) => {
  const dirNames = contents.reduce((arr, t) => {
    const dirName = t.Key.split('/')[0]
    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
    return arr
  }, [])
  return dispatch => {
    dispatch({ type: 'LOAD_DIRNAMES', dirNames })
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


export const addDirName = (dirName) => {
  return dispatch => {
    dispatch({
      type: 'ADD_DIR_NAME',
      dirName
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
