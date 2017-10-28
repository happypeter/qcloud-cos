const initState = {
  newDir: '',
  activeKey: '0',
  allFiles: []
}

const rootReducer = (state=initState, action) => {
  switch (action.type) {
    case 'LOAD_ALL_FILES':
      return {
        ...state,
        allFiles: action.allFiles
      }
    case 'ADD_FILE':
      return {
        ...state,
        allFiles: [...state.allFiles, action.newFile],
        newDir: ''
      }
    case 'REMOVE_FILE':
      const newAllFiles = state.allFiles.filter(
        t => t.Key !== action.key
      )

      return {
        ...state,
        allFiles: newAllFiles,
        activeKey: isLastFile(action.key, newAllFiles) ? '0' : state.activeKey
      }
    case 'SET_NEW_DIR':
      const { newDir } = action
      return {
        ...state,
        activeKey: getDirNames(state.allFiles).length.toString(),
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

const getDirNames = allFiles => {
  const dirNames = allFiles.reduce((arr, t) => {
    const dirName = t.Key.split('/')[0]
    if (arr.indexOf(dirName) === -1) { arr.push(dirName)}
    return arr
  }, [])
  return dirNames
}

const isLastFile = (filePath, newAllFiles) => {
  const dirName = filePath.split('/')[0]
  const isLastFile = !getDirNames(newAllFiles).includes(dirName)
  console.log('isLastFile', isLastFile)
  return isLastFile
}

export const getTabDirNames = state => {
  if (state.newDir) {
    return [
      ...getDirNames(state.allFiles),
      state.newDir
    ]
  }
  return getDirNames(state.allFiles)
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
