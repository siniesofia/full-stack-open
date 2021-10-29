import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import CheckForName from './components/CheckForName'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addNameAndNumber = ( {newName, newNumber }) => {
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const replaceNumber = namenumberandid => {
    const number = namenumberandid[1]
    const id = namenumberandid[2]
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: number }
    axios.put(url, changedPerson).then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response.data))
    })
    setNewName('')
    setNewNumber('')
  }


  const dontAddNameAndNumber = () => {
    setNewName('')
    setNewNumber('')
  }


  const addName = (event) => {
    event.preventDefault()
    const whatToDo = CheckForName({persons}, {newName})
    if (whatToDo === "add name and number") {
      addNameAndNumber({ newName, newNumber })
    } else if (whatToDo === "dont add anything"){
      dontAddNameAndNumber()
    } else {
      replaceNumber([newName, newNumber, whatToDo])
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const personToBeDeleted = persons.filter(person => person.id === id)
    const personDeleted = persons.filter(person => person.id !== id)
    if (window.confirm(`Delete ${personToBeDeleted[0].name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(personDeleted)
          setSuccessMessage(`Deleted ${personToBeDeleted[0].name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <form>
        <div >
          filter shown with: 
          <input 
          value={newFilter}
          onChange={handleFilterChange}
          />
        </div>
      </form>
      <h2>add a new</h2>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson = {deletePerson}></Persons>
    </div>
)
}

export default App


/* tehtävä 2.20 tekemättä (ja maiden tiedot -tehtävistä 2.14)
ja lisäksi pitäisi muttaa kaikki axiosit tulemaan persons service kautta*/

