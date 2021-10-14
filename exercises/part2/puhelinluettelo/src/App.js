import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const checkIfNameExists = (persons, newName) => {
  console.log("newName",newName)
  console.log('tulee ylös')
  console.log('persons', persons)
  console.log('persons.length', persons.persons.length)

  for (let i =0; i < persons.persons.length; i++) {
    console.log('tulee looppin')
    console.log('persons.persons[i].name', persons.persons[i].name)
    console.log('newNamealla', newName.newName)
    if (persons.persons[i].name === newName.newName) {
      console.log('tulee tänne')
      return false
    }
  }
  return true

}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Amira Hellas' },
    { name: 'Elli Ailas'}
  ])

  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (checkIfNameExists({persons}, {newName})) {
      console.log('tulee alle')
      const nameObject = {
        name: newName,
        number: "000",
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    } else {
      setNewName('')
    }

  }



  const handleNameChange = (event) => {
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person person={person}></Person>)}
    </div>
)
}
export default App
