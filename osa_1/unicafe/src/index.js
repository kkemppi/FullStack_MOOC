import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  let sum = good + neutral + bad
  if (sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <p>
        good {good} <br/>
        neutral {neutral} <br/>
        bad {bad} <br/>
        average {(good - bad) / sum} <br/>
        positive {(good / sum) * 100} %
      </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)