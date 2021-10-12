import React, { useState } from 'react'

const Button = ({ handleClick, teksti }) => {
  return (
    <button onClick={handleClick}>{teksti}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>{good}</p>
      <p>{neutral}</p>
      <p>{bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good*1+neutral*0+bad*-1)/(good+neutral+bad)}</p>
      <p>positive {(good*1/(good+neutral+bad))*100} %</p>
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
      <Statistics good={good} neutral={neutral} bad={bad} 
      ></Statistics>
  </div>
  )
}

export default App
