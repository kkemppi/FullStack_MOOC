import React from 'react'
import DisplayPerson from './DisplayPerson'

const Persons = ({persons, filterField, setPersons, setMessage, setError}) => {
    const to_show = persons.filter(person => person.name.toLocaleLowerCase().includes(filterField.toLocaleLowerCase()))
    return(
    <ul>
        {to_show.map(to_show => <li key={to_show.name}> <DisplayPerson.DisplayPerson to_show = {to_show} persons = {persons} setPersons={setPersons} setMessage = {setMessage} setError = {setError}/></li>)}
    </ul>
    )
}

export default {Persons}