const initState = {
  newDir: '',
  activeKey: '0',
  allFiles: []
}
const rootReducer = (state=initState, action) => {
  let newAllFiles
  switch (action.type) {
    case 'LOAD_ALL_FILES':
      const { allFiles } = action
      return {
        ...state,
        allFiles,
        newDir: '' //清空一下有必要
      }
    case 'REMOVE_FILE':
      newAllFiles = state.allFiles.filter(
        t => t.Key !== action.key
      )
      // FIXME: need to change activeKey if it's the last file in dir
      return {
        ...state,
        allFiles: newAllFiles
      }
    case 'SET_NEW_DIR':
      const { newDir } = action
      return {
        ...state,
        activeKey: getDirNames(state).length.toString(),
        newDir
      }
    case 'SET_ACTIVE_KEY':
      const { activeKey } = action
      return {
        ...state,
        activeKey
      }
    default:
      return state
  }
}

export const getDirNames = state => {
  const dirNames = state.allFiles.reduce((arr, t) => {
    const dirName = t.Key.split('/')[0]
    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
    return arr
  }, [])
  return dirNames
}

export const getTabDirNames = state => {
  if (state.newDir) {
    return [
      ...getDirNames(state),
      state.newDir
    ]
  }
  return getDirNames(state)
}

export const getSelectedDir = state => {
  return getTabDirNames(state)[state.activeKey]
}

export const getSelectedDirFiles = state => {
  return state.allFiles.filter(
    t => {
      return t.Key.split('/')[0] === getSelectedDir(state)
    }
  )
}

export const getActiveKey = state => state.activeKey
export const getNewDir = state => state.newDir

export default rootReducer
