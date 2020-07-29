import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog, user, addLike, deleteBlog}) => {
  const [full, setFull] = useState(false)

  const toggleFull = () => setFull(!full)

  return (
    !full
      ?
      <div className="blogStyle">
        {blog.title} {blog.author} <button onClick={() => toggleFull()}>view</button>
      </div>
      :
      <div className="blogStyle">
        {blog.title} {blog.author} <button onClick={() => toggleFull()}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} <button id='like' onClick={() => addLike(blog)}>like</button> <br/>
        {blog.user.name} <br/>
        {user.username === blog.user.username 
        ? <button onClick={() => deleteBlog(blog)}>remove</button>
         : null}
      </div>
  )
}

export default Blog
