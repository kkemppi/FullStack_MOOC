import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandom = () => {
  return Math.floor(Math.random() * Math.floor(anecdotes.length - 1))
}

const vote = (vote_values, index) => {
  const new_votes = {...vote_values}
  new_votes[index] += 1
  return new_votes
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(init_array)

  return (
    <div>
      <p>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes
      </p>
      <button onClick={() => setVotes(vote(votes, selected))}>vote</button>
      <button onClick={() => setSelected(getRandom())}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const init_array = new Array(6).fill(0)


ReactDOM.render(
  <App anecdotes={anecdotes} votes = {init_array}/>,
  document.getElementById('root')
)