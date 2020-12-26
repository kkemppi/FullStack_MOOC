import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotif} from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    dispatch(vote(anecdote))

    dispatch(setNotif("You voted for " + anecdote.content, 5))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => voteFor(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList