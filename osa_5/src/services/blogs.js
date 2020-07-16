import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.post(baseUrl, newBlog, config)
  const request = await axios.get(baseUrl)
  return request.data
}

const updateBlog = async (blogObj) => {
  await axios.put(`${baseUrl}/${blogObj.id}`, blogObj)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getToken = () => token

export default { getAll, setToken, addBlog, updateBlog, deleteBlog, getToken }