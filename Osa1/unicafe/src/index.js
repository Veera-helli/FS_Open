import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text, color }) => (
  <button onClick={onClick} style={{ backgroundColor: color }}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h2>Give feedback for Unicafe!</h2>
      <Button onClick={handleGoodClick} text={"Good"} color={'green'} />
      <Button onClick={handleNeutralClick} text={"Neutral"} color={'orange'}/>
      <Button onClick={handleBadClick} text={"Bad"} color={'red'}/>
      <br></br>

      <h2>Statistics</h2>
      <p>good {good} </p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
