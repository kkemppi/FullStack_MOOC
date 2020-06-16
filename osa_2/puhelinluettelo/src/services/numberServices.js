import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getData = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const removePerson = (to_show) => {
    if (window.confirm(`Delete ${to_show.name}?`)) {
        return axios.delete(`${baseUrl}/${to_show.id}`)
    }
    return getData()
}

const update = (person_info) => {
        return axios.put(`${baseUrl}/${person_info.id}`, person_info)
}

export default {getData, addPerson, removePerson, update}