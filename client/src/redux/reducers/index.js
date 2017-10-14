const initState = {
  selectedDir: '',
  dirNames: []
}
const rootReducer = (state=initState, action) => {
  switch (action.type) {
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
    default:
      return state
  }
}

export default rootReducer
