const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return "Added " + action.content
    case 'REMOVE_NOTIFICATION':
      return null
    case "VOTE_NOTIFICATION":
      return "You voted for '" + action.content +"'"
    default:
      return state
  }
}

export const addNotif = (text) => {
  return {
    type: "ADD_NOTIFICATION",
    content: text
  }
}

export const removeNotif = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

export const voteNotif = (text) => {
  return {
    type: "VOTE_NOTIFICATION",
    content: text
  }
}

export default notificationReducer