import React from 'react'
import ToggleBlogs from './ToggleBlogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      {<ToggleBlogs buttonLabel='view'>
        {blog.url}
        <br></br>
        likes {blog.likes} <button>like</button>
        <br></br>
        {blog.author} 
        </ToggleBlogs>}
      <br></br>
    </div>  
  )

}

export default Blog