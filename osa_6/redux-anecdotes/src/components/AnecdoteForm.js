import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotif("New anecdote " + content, 5))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name = "anecdote"/>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm

