import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const add_name = (event) => {
    event.preventDefault()
    const person_info = {
      name: newName
    }
    if (persons.map(persons => persons.name).includes(newName)) {
        window.alert(`${newName} is already added to phonebook`)
        return
    }
    setPersons(persons.concat(person_info))
    setNewName('')
  }
  

  const handle_input = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={add_name}>
        <div>
          name: <input 
          value={newName}
          onChange={handle_input}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>      
          {persons.map(persons => <li key={persons.name}>{persons.name}</li>)}
        </ul>

    </div>
  )

}

export default App
