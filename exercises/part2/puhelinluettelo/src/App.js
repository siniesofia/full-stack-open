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
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

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
      <Persons persons={persons} newFilter={newFilter}></Persons>
    </div>
)
}

export default App
