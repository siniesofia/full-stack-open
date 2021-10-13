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
      <h2>{course}</h2>
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
    const sum = allExercises.reduce((previousValue, currentValue) => previousValue + currentValue)
    return (
      <div style={{fontWeight: 'bold'}}>
        total of {sum} exercises
      </div>
    )
  }

export default Course