import React from 'react'
import AddName from './AddName'

const InputForms = ({persons, setPersons, setNewName, setNewNum, newName, newNumber, handle_name_input, handle_num_input, setMessage, setError}) => {
    return(
    <form onSubmit={(event) => {event.preventDefault(); AddName.AddName(persons, setPersons, setNewName, setNewNum, newName, newNumber, setMessage, setError)}}>
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

export default {InputForms}