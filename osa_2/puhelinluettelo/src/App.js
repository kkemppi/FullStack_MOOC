import React, { useState, useEffect } from 'react'
import numberService from './services/numberServices'
import './index.css'
import Notification from './components/Notifications'
import Persons from './components/Persons'
import InputForms from './components/InputForms'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [filterField, setFilterField] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setError] = useState(null)

  useEffect(()=> {
    numberService
      .getData()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const handle_filter = (event) => setFilterField(event.target.value)

  const handle_name_input = (event) => setNewName(event.target.value)

  const handle_num_input = (event) => setNewNum(event.target.value)

  return (
    <div>
      <Notification.Notification message = {message}/>
      <Notification.ErrorNotification message = {errorMessage}/>
      <h2>Phonebook</h2>
      <Filter.FilterForm handle_filter = {handle_filter}/>
      <h2>add new number</h2>
      <InputForms.InputForms  persons = {persons} setPersons = {setPersons}
                    newNumber = {newNumber} setNewNum = {setNewNum}
                    newName = {newName} setNewName ={setNewName}
                    handle_num_input = {handle_num_input} handle_name_input = {handle_name_input}
                    setMessage = {setMessage} setError = {setError}/>
      <h2>Numbers</h2>
        <Persons.Persons persons = {persons} filterField = {filterField} setPersons = {setPersons} setMessage = {setMessage} setError = {setError}/>
    </div>
  )
}

export default App
