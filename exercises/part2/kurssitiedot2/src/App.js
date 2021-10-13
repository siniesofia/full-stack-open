import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
    </div>
  )
}

const Header = ( {course} ) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ( {parts} ) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}></Part>)}
      <Total parts={parts}></Total>
    </div>

  )
}

const Part = ( {part} ) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const allExercises = parts.map(part => part.exercises)
  const reducer = (previousValue, currentValue) => previousValue + currentValue
  const sum = allExercises.reduce(reducer)
  return (
    <div style={{fontWeight: 'bold'}}>
      total of {sum} exercises
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }, 
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course key={course.id} course={course}></Course>
    </div>
  )


}

export default App
