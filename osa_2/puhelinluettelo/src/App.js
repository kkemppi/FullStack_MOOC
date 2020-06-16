import React, { useState, useEffect } from 'react'
import numberService from './services/numberServices'

const Persons = ({persons, filterField, setPersons}) => {
    const to_show = persons.filter(person => person.name.toLocaleLowerCase().includes(filterField.toLocaleLowerCase()))
    return(
    <ul>
        {to_show.map(to_show => <li key={to_show.name}> <DisplayPerson to_show = {to_show} persons = {persons} setPersons={setPersons}/></li>)}
    </ul>
    )
}

const DisplayPerson = ({to_show, setPersons}) => 
{
  return (
  <div>{to_show.name} {to_show.number}
  <button onClick = {() => RemoveName(to_show, setPersons)}> delete</button>
  </div>
  )
}

const FilterForm = ({handle_filter}) => {
  return(
  <div>
    filter shown with<input
    onChange={handle_filter}/>
  </div>
  )
}

const AddName = (persons, setPersons, setNewName, setNewNum, newName, newNumber) => {
    const person_info = {
    name: newName, 
    number: newNumber
  }
  if (persons.map(persons => persons.name).includes(newName)) {
      const user_names = persons.map(person => person.name)
      const user_index = user_names.indexOf(newName)
      const user = persons[user_index]
      user.number = newNumber
      numberService
        .update(user)
        .then(response => {setPersons(persons.map(person => person.id !== response.id ? person : response.data))})
  }else{
  numberService
    .addPerson(person_info)
    .then(return_val => {setPersons(persons.concat(return_val))})
  }
  setNewName('')
  setNewNum('')
}

const RemoveName = (to_show, setPersons) => {
    numberService
      .removePerson(to_show)
      .then(()=> {
        numberService
          .getData()
          .then(initialPersons => {setPersons(initialPersons)})})
}

const InputForms = ({persons, setPersons, setNewName, setNewNum, newName, newNumber, handle_name_input, handle_num_input}) => {
  return(
  <form onSubmit={(event) => {event.preventDefault(); AddName(persons, setPersons, setNewName, setNewNum, newName, newNumber)}}>
        <div>
          name: <input 
          value={newName}
          onChange={handle_name_input}/> <br/>
          number: <input 
          value={newNumber}
          onChange={handle_num_input}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [filterField, setFilterField] = useState('')

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
      <h2>Phonebook</h2>
      <FilterForm handle_filter = {handle_filter}/>
      <h2>add new number</h2>
      <InputForms  persons = {persons} setPersons = {setPersons}
                    newNumber = {newNumber} setNewNum = {setNewNum}
                    newName = {newName} setNewName ={setNewName}
                    handle_num_input = {handle_num_input} handle_name_input = {handle_name_input}/>
      <h2>Numbers</h2>
        <Persons persons = {persons} filterField = {filterField} setPersons = {setPersons}/>
    </div>
  )

}

export default App
