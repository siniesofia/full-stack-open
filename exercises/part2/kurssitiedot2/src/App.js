import React from 'react'

const Course = ({ course }) => {
  console.log('course.parts', course.parts)
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
  console.log('parts[0]', parts[0])
  return (
    <div>
      {parts.map(part => <Part part={part}></Part>)}
    </div>

  )
}

const Part = ( {part} ) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ( { exercises } ) => {
  return (
    <p>Number of exercises {exercises}</p>
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
