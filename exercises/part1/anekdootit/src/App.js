import React, { useState } from 'react'

const Button = ({ teksti, handleClick }) => {
  return (
      <button onClick={handleClick}>{teksti}</button>
  )
}

const GetRandomInt = () => {
  return Math.floor(Math.random() * (6 + 1))
}

const AnecdoteWithMostVotes = ( {points, anecdotes} ) => {
  let maxvalue = Math.max(...points)
  for (var i = 0; i < points.length; i++) {
    if (points[i] === maxvalue) {
      return (
        <>
          <div>
            {anecdotes[i]}
          </div>
          <div>has {points[i]} votes</div>
        </>
      )
    }
  }
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const handleClick = () => {
    setSelected(GetRandomInt())
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} points</div>
      <Button teksti="vote" handleClick={handleVote}></Button>
      <Button teksti="next anecdote" handleClick={handleClick}></Button>
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVotes points={points} anecdotes={anecdotes}></AnecdoteWithMostVotes>

    </div>
  )
}

export default App