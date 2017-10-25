import Settings from '../../settings'
import axios from 'axios'


export const selectDir = (selectedDir) => {
  return dispatch => {
    dispatch({ type: 'SELETCT_DIR', selectedDir})
  }
}

const setDirNames = (contents, dispatch) => {
  const dirNames = contents.reduce((arr, t) => {
    const dirName = t.Key.split('/')[0]
    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
    return arr
  }, [])
  dispatch({ type: 'LOAD_DIR_NAMES', dirNames })
}

export const loadAllFiles = () => {
  return dispatch => {
    axios.get(Settings.bucketUrl).then(
      res => {
        const allFiles = res.data.Contents
        console.log('loadAllFiles++++allFiles', allFiles)
        // FIXME: action 中一个 action creator 中顺带呼叫另外一个，是这么玩吧？
        setDirNames(allFiles, dispatch)
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
