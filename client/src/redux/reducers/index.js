const initState = {
  selectedDir: '',
  dirNames: [],
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
        allFiles
      }
    case 'REMOVE_FROM_ALL_FILES':
      newAllFiles = state.allFiles.filter(
        t => t.Key !== action.key
      )
      return {
        ...state,
        allFiles: newAllFiles
      }
    case 'SELETCT_DIR':
      const { selectedDir } = action
      console.log('selectedDir', selectedDir)
      return {
               ...state,
               selectedDir
             }
    case 'LOAD_DIRNAMES':
       const { dirNames } = action
       console.log('LOAD_DIRNAMES', dirNames)
       return {
         ...state,
         dirNames
       }
    case 'ADD_DIR_NAME':
      const { dirName } = action
      console.log('ADD_DIR_NAME', dirName)
      return {
        ...state,
        dirNames: [...state.dirNames, dirName],
        selectedDir: dirName,
        activeKey: state.dirNames.length.toString()
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

export default rootReducer
