import React from 'react'

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}


const Persons = (props) => {
    const persons = props.persons
    const filter = props.newFilter
    return (
      <div>
      {persons.filter(person => person.name.includes(filter)).map(person => <Person key={person.name} person={person}></Person>)}
      </div>
    )
}
  
export default Persons