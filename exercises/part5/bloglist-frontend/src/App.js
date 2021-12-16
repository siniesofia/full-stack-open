import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import NewBlogForm from './components/CreateNewBlog'
import Togglable from './components/Togglable'



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
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddNew = async (event) => {
    event.preventDefault()
    console.log('adding new with', title, author, url)
    const newBlog = {
      'title': title,
      'author': author,
      'url': url
    }

    try {
      const addedBlog = await blogService.create(newBlog)
      console.log('tulostuuko', addedBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage('Added a new blog')
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
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
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
      <br></br>
      <Togglable buttonLabel='create new'>
        <NewBlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleAddNew={handleAddNew}
        />
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )
}

export default App