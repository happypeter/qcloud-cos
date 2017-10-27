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
    case 'REMOVE_FROM_ALL_FILES':
      newAllFiles = state.allFiles.filter(
        t => t.Key !== action.key
      )
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
      console.log('SET_ACTIVE_KEY', activeKey)
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

export default rootReducer
