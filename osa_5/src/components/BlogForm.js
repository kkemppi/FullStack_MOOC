
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogURL('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={(event) => addBlog(event)}>
        <div>
        title:
          <input
            id='title'
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            id='author'
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            value={newBlogURL}
            onChange={({ target }) => setNewBlogURL(target.value)}
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )}

export default BlogForm