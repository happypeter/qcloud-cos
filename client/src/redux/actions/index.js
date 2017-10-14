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
