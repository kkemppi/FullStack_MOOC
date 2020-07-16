import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import BlogDisplay from './components/BlogDisplay'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      const blogData = await blogService.getAll()
      setBlogs(blogData)
    }
    fetchData()

  }, [])

  useEffect(() => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sorted)
  }, [blogs])

  const blogForm = () => {
    return(
      <Toggleable buttonLabel = "new blog" ref = {blogFormRef}>
        <BlogForm createBlog = {addBlog} blogs = {blogs} blogFormRef = {blogFormRef}></BlogForm>
      </Toggleable>
    )
  }

  const Notification = (props) => {
    if (props.message === null) {
      return null
    }
    return (
      <div className="success">{props.message}</div>
    )
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const result = await blogService.addBlog(blogObject)
    setBlogs(result)
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => setMessage(null), 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`${username} logged in`)
    } catch (exception) {
      setMessage('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => setMessage(null), 4000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>

      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message = {message}></Notification>
      {user === null ?
        loginForm() :
        <BlogDisplay user = {user}
          handleLogout = {handleLogout}
          blogs = {blogs}
          blogForm={blogForm}
          setBlogs={setBlogs}>
        </BlogDisplay>
      }
    </div>
  )
}

export default App