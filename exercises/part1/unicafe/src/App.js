import React, { useState } from 'react'

const Button = ({ handleClick, teksti }) => {
  return (
    <button onClick={handleClick}>{teksti}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  // if (value[1]==="%") {
  //   return (
  //     <tr>
  //       <td>{text}</td>
  //       <td>{Math.round(value[0]*10)/10+"%"}</td>
  //     </tr>
  //   )
  // }
  return (
    <tbody>

        <td>{text}</td>
        <td>{Math.round(value[0]*10)/10}</td>

    </tbody>

  )
}

const Statistics = ({ good, neutral, bad }) => {
  const yhteensa = good+neutral+bad
  if (yhteensa === 0) {
    return (
      <div>
        No feedback given
      </div>
    ) 
  }
    return (
      <>
        <StatisticLine text="good" value={[good,0]}></StatisticLine>
        <StatisticLine text="neutral" value={[neutral, 0]}></StatisticLine>
        <StatisticLine text="bad" value={[bad, 0]}></StatisticLine>
        <StatisticLine text="all" value={[good + neutral + bad, 0]}></StatisticLine>
        <StatisticLine text="average" value={[(good*1+neutral*0+bad*-1)/(good+neutral+bad), 0]}></StatisticLine>
        <StatisticLine text="positive" value={[(good*1/(good+neutral+bad))*100,"%"]}></StatisticLine>
      </>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} 
      ></Statistics>
  </div>
  )
}

export default App
