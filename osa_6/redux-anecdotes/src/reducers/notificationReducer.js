let timeoutId = null

const notifReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.data
    }
    case 'RESET': {
      return null
    }
    default: {
      return state
    }
  }
}

export const setNotif = (msg, sec) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: msg
    })
    timeoutId = setTimeout(() => dispatch({ type: 'RESET'}), 1000 * sec)
  }
}

export default notifReducer