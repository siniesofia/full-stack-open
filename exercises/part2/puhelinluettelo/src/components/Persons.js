import React from 'react'

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}

const Persons = ({ persons }) => {
    return (
      <div>
      {persons.map(person => <Person person={person}></Person>)}
      </div>
    )
}
  
export default Persons