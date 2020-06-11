import React, { useState } from 'react'

const Persons = ({persons, filterField}) => {
    const to_show = persons.filter(person => person.name.toLocaleLowerCase().includes(filterField.toLocaleLowerCase()))
    return(
    <ul>
        {to_show.map(to_show => <li key={to_show.name}> <DisplayPerson to_show = {to_show}/></li>)}
    </ul>
    )
}

const DisplayPerson = ({to_show}) => <div>{to_show.name} {to_show.number}</div>

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
      window.alert(`${newName} is already added to phonebook`)
      return
  }
  setPersons(persons.concat(person_info))
  setNewName('')
  setNewNum('')
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
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [filterField, setFilterField] = useState('')


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
        <Persons persons = {persons} filterField = {filterField}/>
    </div>
  )

}

export default App
