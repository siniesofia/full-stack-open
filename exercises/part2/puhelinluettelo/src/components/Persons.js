import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={deletePerson}>delete</button>
        </div>

    )
}


const Persons = (props) => {
    const persons = props.persons
    const filter = props.newFilter
    const deletePerson = props.deletePerson
    return (
      <div>
      {persons.filter(person => person.name.includes(filter)).map(person => <Person 
      key={person.name} 
      person={person} 
      deletePerson={() => deletePerson(person.id)}
      ></Person>)}
      </div>
    )
}
  
export default Persons