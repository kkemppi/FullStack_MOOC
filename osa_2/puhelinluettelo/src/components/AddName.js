import numberService from './../services/numberServices'

const AddName = (persons, setPersons, setNewName, setNewNum, newName, newNumber, setMessage, setError) => {
    const person_info = {
    name: newName, 
    number: newNumber
  }
  if (persons.map(persons => persons.name).includes(newName) && window.confirm(`${person_info.name} is already added to phonebook, replace old number with new one?`)) {
      const user = persons.find(n => n.name === newName)
      user.number = newNumber
      numberService
        .update(user)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response.data))
          setMessage(`Updated number of ${newName}`)
          setTimeout(() => {setMessage(null)}, 4000)
        })
        .catch(error => {
          setError(`${newName} has already been removed from server`)
          setPersons(persons.filter(n => n.id !== user.id) )
          setTimeout(() => {setError(null)}, 4000)
        })
  }
  if (!(persons.map(persons => persons.name).includes(newName))) {
  numberService
    .addPerson(person_info)
    .then(return_val => {setPersons(persons.concat(return_val))},
          setMessage(`Added ${newName}`),
          setTimeout(() => {setMessage(null)}, 4000))
  }
  setNewName('')
  setNewNum('')
}

export default {AddName}