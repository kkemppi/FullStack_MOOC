import React from 'react'
import RemoveName from './RemoveName'

const DisplayPerson = ({to_show, setPersons, setMessage, persons, setError}) => 
{
  return (
  <div>{to_show.name} {to_show.number}
  <button onClick = {() => RemoveName.RemoveName(to_show, setPersons, setMessage, persons, setError)}>delete</button>
  </div>
  )
}

export default {DisplayPerson}