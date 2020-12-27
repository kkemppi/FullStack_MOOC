import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotif} from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const voteFor = (anecdote) => {
    props.vote(anecdote)

    props.setNotif("You voted for " + anecdote.content, 5)
  }

  return (
    props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  vote,
  setNotif
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList