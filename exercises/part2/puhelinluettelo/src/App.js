import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import CheckForName from './components/CheckForName'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Amira Hellas' , number: "098765"},
    { name: 'Elli Ailas', number: "234567"}
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    console.log('tapahtuu jotain')
    setNewFilter(event.target.value)
  }

  const FilterForm = ({ newFilter, handleFilterChange }) => {
    return (
      <form>
        <div >
          filter shown with: 
          <input 
          value={newFilter.newFilter}
          onChange={handleFilterChange.handleFilterChange}
          />
        </div>
      </form>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}></FilterForm>
      <h2>add a new</h2>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons}></Persons>
      <p>{newFilter}</p>
    </div>
    
)
}
export default App
