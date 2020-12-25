import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotif } from '../reducers/notificationReducer'
import { removeNotif } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const voteFor = (id) => {
    dispatch(vote(id))
    dispatch(voteNotif(anecdotes.find(item => item.id === id).content))
    setTimeout (() => {
      dispatch(removeNotif())
    }, 5000)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteFor(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList