import React from 'react'
import Blog from './Blog'


const BlogDisplay = ({user, handleLogout, blogs, blogForm, setBlogs}) => {

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
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
        )}
    </div>
    )
}

export default BlogDisplay