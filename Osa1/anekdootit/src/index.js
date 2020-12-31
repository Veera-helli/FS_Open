import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Stat = ({ num }) => (
  <p>has {num} votes</p>
)

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * Math.floor(5)))
  const [votes, setVotes] = useState(0)

  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * Math.floor(5)))
    setVotes(props.anecdotes[selected][1])
  }

  const setToValue = (newValue) => () => {
    props.anecdotes[newValue][1] += 1
    setVotes(props.anecdotes[selected][1])
  }

  return (
    <div>
      <p>{props.anecdotes[selected][0]}</p>
      <Stat num = {votes} />
      <Button onClick={setToValue(selected)} text={"Vote"}/>
      <Button onClick={handleRandom} text={"Next anecdote"}/>
    </div>
  )
}

const anecdotes = [
  ['If it hurts, do it more often',0],
  ['Adding manpower to a late software project makes it later!',0],
  ['The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',0],
  ['Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',0],
  ['Premature optimization is the root of all evil.',0],
  ['Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',0]
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
