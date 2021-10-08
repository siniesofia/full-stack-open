import React from 'react'

const Header = ( {course} ) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ( {parts, exercises } ) => {
  return (
    <>
      <Part part={parts[0]} exercises={exercises[0]} />
      <Part part={parts[1]} exercises={exercises[1]} />
      <Part part={parts[2]} exercises={exercises[2]} />
    </>
  )
}

const Part = ( {part, exercises} ) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Total = ( { exercises } ) => {
  return (
    <p>Number of exercises {exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={[part1.name, part2.name, part3.name]} exercises={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total exercises={[part1.exercises + part2.exercises + part3.exercises]} />
    </div>
  )
}

export default App
