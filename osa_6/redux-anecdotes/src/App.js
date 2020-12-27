import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initData } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initData())
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <h2>create new</h2>
      <AnecdoteForm/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
    </div>
  )
}

export default App