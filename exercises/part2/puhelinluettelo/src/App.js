import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import CheckForName from './components/CheckForName'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'notes')

  const addNameAndNumber = ( {newName, newNumber }) => {
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    // setPersons(persons.concat(nameObject))
    // setNewName('')
    // setNewNumber('')
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
  }
  console.log('persons', persons)

  const dontAddNameAndNumber = () => {
    setNewName('')
    setNewNumber('')
  }

  const addName = (event) => {
    event.preventDefault()
    {(CheckForName({persons}, {newName})) 
    ? addNameAndNumber({ newName, newNumber })
    : dontAddNameAndNumber()
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
    const url = `http://localhost:3001/persons/${id}`
    const personToBeDeleted = persons.filter(person => person.id === id)
    const personDeleted = persons.filter(person => person.id !== id)
    console.log('persontobedeleted[0]', personToBeDeleted[0].name)
    console.log('personToBeDeleted', personToBeDeleted)
    console.log('personDeleted', personDeleted)
    if (window.confirm(`Delete ${personToBeDeleted[0].name}?`)) {
      axios
      .delete(url)
      .then(response => {
        setPersons(personDeleted)
      })
    }

    console.log(`person ${id} needs to be removed`)
    console.log('persons', persons)
    console.log('personDeleted', personDeleted)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
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
