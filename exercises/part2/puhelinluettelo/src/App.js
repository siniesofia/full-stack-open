import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const checkIfNameExists = (persons, newName) => {
  const length = persons.persons.length
  const name = newName.newName
  for (let i =0; i < length; i++) {
    if (persons.persons[i].name === name) {
      window.alert(`${name} is already added to phonebook`)
      return false
    }
  }
  return true
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Amira Hellas' , number: "098765"},
    { name: 'Elli Ailas', number: "234567"}
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (checkIfNameExists({persons}, {newName})) {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      setNewName('')
      setNewNumber('')

    }

  }



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name}person={person}></Person>)}
    </div>
)
}
export default App
