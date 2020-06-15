import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    console.log(request)
    return request.then(response => response.data)
}

const removePerson = (to_show) => {
    console.log(to_show.id)
    if (window.confirm(`Delete ${to_show.name}?`)) {
        return axios.delete(`${baseUrl}/${to_show.id}`)
    }
    return getData()
}

export default {getData, addPerson, removePerson}