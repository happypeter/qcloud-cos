const initState = {
  selectedDir: '',
  dirNames: [],
  activeKey: '0',
  allFiles: []
}
const rootReducer = (state=initState, action) => {
  switch (action.type) {
    case 'LOAD_ALL_FILES':
      const { allFiles } = action
      return {
        ...state,
        allFiles
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
    case 'ADD_DIRNAME':
      const { dirName } = action
      console.log('ADD_DIRNAME', dirName)
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
