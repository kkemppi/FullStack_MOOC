import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const anecdote = state.find(item => item.id === action.data.id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : votedAnecdote)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_STATE':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = asObject(content)
    await anecdoteService.postAnecdote(newAnecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  const id = anecdote.id
  return async dispatch => {
    dispatch({
      type: 'VOTE',
      data: {id}
    })
    await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
  }
}

export const initData = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_STATE',
      data: data
    })
  }
}

export default anecdoteReducer