import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteFor = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
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