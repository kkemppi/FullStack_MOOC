import numberService from './../services/numberServices'

const RemoveName = (to_show, setPersons, setMessage, persons, setError) => {
    numberService
      .removePerson(to_show)
      .then(()=> {
        numberService
          .getData()
          .then(response => {
            setPersons(response)},
            setMessage(`Removed ${to_show.name}`),
            setTimeout(() => {setMessage(null)}, 4000))
          })
          .catch(error => {
            setError(`${to_show.name} has already been removed from server`)
            setPersons(persons.filter(n => n.id !== to_show.id) )
            setTimeout(() => {setError(null)}, 4000)
          })
}

export default {RemoveName}