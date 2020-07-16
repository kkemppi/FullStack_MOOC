import React, {useState} from 'react'
import '../App.css'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [full, setFull] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleFull = () => setFull(!full)

  const addLike = () => {
    setLikes(likes+1)
    const payload = {...blog}
    payload.user = blog.user.id
    payload.likes = likes
    blogService.updateBlog(payload)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const request = await blogService.deleteBlog(blog.id)
      setBlogs(request)
    }
  }

  return (
  !full 
  ?
    <div className="blogStyle">
      {blog.title} {blog.author} <button onClick={() => toggleFull()}>view</button>
    </div>
  :
      <div className="blogStyle">
        {blog.title} {blog.author} <button onClick={() => toggleFull()}>hide</button><br/>
        {blog.url}<br/>
        likes {likes} <button onClick={() => addLike()}>like</button><br/>
        {blog.user.name}<br/>
        {user.username === blog.user.username ? <button onClick={() => deleteBlog()}>remove</button> : null}
      </div>
  )
}

export default Blog
