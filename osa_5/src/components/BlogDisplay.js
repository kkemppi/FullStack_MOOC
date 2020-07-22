import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'


const BlogDisplay = ({ user, handleLogout, blogs, blogForm, setBlogs, addLike, deleteBlog }) => {

  return (
    <div>
      <h2>blogs</h2>
      <p>
        <b>{user.name}</b> logged in
        <button onClick = {(event) => handleLogout(event)}>logout</button>
      </p>
      {blogForm()}
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} addLike={addLike} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

BlogDisplay.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  blogForm: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default BlogDisplay