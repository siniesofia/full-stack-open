import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const blogId = newObject.blogid
  console.log('blogId', blogId)
  const updatedBlog = {
    'title': newObject.title,
    'author': newObject.author,
    'url': newObject.url,
    'likes': newObject.likes,
    'user': newObject.user,
  }
  console.log('blogId', blogId)

  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const deleteblog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
  // const response = await axios.delete(`/${id}`)
  // return response.data
}

export default { getAll, create, setToken, deleteblog, update }