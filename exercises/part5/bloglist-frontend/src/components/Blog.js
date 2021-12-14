import ToggleBlogs from './ToggleBlogs'
import ToggleDeleteButton from './ToggleDeleteButton'
import blogService from '/Users/mac/full-stack-open/exercises/part5/bloglist-frontend/src/services/blogs'

const Blog = ({ blog, user }) => {

  const handleRemoval = async (event) => {
    if (window.confirm("Remove blog?")) {
      console.log(event.target.value)
      const id = blog.id
      console.log('poistetaan...')
      blogService.deleteblog(id)
      .then(response => {
        console.log('response', response)
      })
    }

  
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('blog.author', blog.user.username)
  console.log('username', user.username)
  if (blog.user.username === user.username) {
    return (
      <div style={blogStyle}>
        {blog.title}
        {<ToggleBlogs buttonLabel='view'>
          {blog.url}
          <br></br>
          likes {blog.likes} <button>like</button>
          <br></br>
          {blog.author} 
          <br></br>
          <button onClick={handleRemoval}>remove</button>
          </ToggleBlogs>}
      </div>  
    )
  } else {
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
      </div>  
    )
  }


}

export default Blog