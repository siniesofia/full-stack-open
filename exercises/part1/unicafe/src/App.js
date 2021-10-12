import React, { useState } from 'react'

const Button = ({ handleClick, teksti }) => {
  return (
    <button onClick={handleClick}>{teksti}</button>
  )
}

const StatisticsDisplay = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>{good}</p>
      <p>{neutral}</p>
      <p>{bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} teksti="good"></Button>
      <Button handleClick={handleNeutralClick} teksti="neutral"></Button>
      <Button handleClick={handleBadClick} teksti="bad"></Button>
      <StatisticsDisplay good={good} neutral={neutral} bad={bad} 
      ></StatisticsDisplay>
  </div>
  )
}

export default App
