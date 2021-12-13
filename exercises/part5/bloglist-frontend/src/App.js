import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('event', event)
    } catch {
      console.log('wrong username or password')
      setErrorMessage(`wrong username or password`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddNew = async (event) => {
    event.preventDefault()
    console.log('adding new with', title, author, url)
    const newBlog = {
      "title": title,
      "author": author,
      "url": url
    }

    try {
      const addedBlog = await blogService.create(newBlog)
      console.log('tulostuuko', addedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`Added a new blog`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      console.log('something went wrong')
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
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
  }

  return (
    <div>
      <SuccessNotification message={successMessage} />
      <p>{user.name} logged in</p>
      <form onClick={handleLogout}>
        <button>logout</button>
      </form>  
      <h2>create new</h2>
      <form onSubmit={handleAddNew}>
        <div>
          title
            <input
            type="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="create">create</button>
      </form>   
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App