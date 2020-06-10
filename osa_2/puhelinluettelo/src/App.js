import React, { useState } from 'react'

const Filter = ({shownNames}) => {
    return(
    <ul>
        {shownNames.map(shownNames => <li key={shownNames.name}>{shownNames.name} {shownNames.number}</li>)}
    </ul>
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
  const [shownNames, setShownNames] = useState(persons)

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

  const handle_filter = (event) => {
    setFilterField(event.target.value)
    console.log(filterField)
    setShownNames(persons.filter(person => person.name.toLocaleLowerCase().includes(filterField.toLocaleLowerCase()))    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with<input
          onChange={handle_filter}/>
      </div>
      <h2>add new number</h2>
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
        <Filter shownNames = {shownNames}/>
    </div>
  )

}

export default App
