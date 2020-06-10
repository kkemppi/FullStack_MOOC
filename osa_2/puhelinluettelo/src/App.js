import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')


  const add_name = (event) => {
    event.preventDefault()
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
  

  const handle_name_input = (event) => setNewName(event.target.value)

  const handle_num_input = (event) => setNewNum(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_name}>
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
      <h2>Numbers</h2>
        <ul>      
          {persons.map(persons => <li key={persons.name}>{persons.name} {persons.number}</li>)}
        </ul>

    </div>
  )

}

export default App
