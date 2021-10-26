import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
    console.log('tulee tännekin')
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll: getAll,
    create: create,
    deletePerson: deletePerson
  }