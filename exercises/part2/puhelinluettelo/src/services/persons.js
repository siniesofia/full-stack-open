import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newObject => {
  console.log('tulee tänne')
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    // return axios.post(baseUrl, newObject)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const replaceNumber = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson)
  return request.then(response => response.data)
  // return axios.put(`${baseUrl}/${id}`, changedPerson)
}

export default { getAll, create, deletePerson, replaceNumber
  }