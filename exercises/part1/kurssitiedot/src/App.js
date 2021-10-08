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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  parts.map(part => "moi")

  console.log('parts=', parts)

  return (
    <div>
      <Header course={course} />
      {parts.map(part => <Part part={part.name} exercises={part.exercises} />)}
      <Total exercises={[parts[0].exercises + parts[1].exercises + parts[2].exercises]} />
    </div>
  )


}

export default App
