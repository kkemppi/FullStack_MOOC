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
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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
      blogData.sort((a, b) => b.likes - a.likes)
      setBlogs(blogData)
    }
    fetchData()

  }, [])

  const addLike = async (blog) => {
    setBlogs(blogs.map(item => 
      item.id === blog.id ? {...item, likes: item.likes+1} : item))

    let payload = { ...blog }
    payload.user = blog.user.id
    payload.likes = blog.likes++
    await blogService.updateBlog(payload)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const request = await blogService.deleteBlog(blog.id)
      setBlogs(request)
    }
  }

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
      <div className="error">{props.message}</div>
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
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
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
          blogs = {sortedBlogs}
          blogForm={blogForm}
          setBlogs={setBlogs}
          addLike={addLike}
          deleteBlog={deleteBlog}>
        </BlogDisplay>
      }
    </div>
  )
}

export default App