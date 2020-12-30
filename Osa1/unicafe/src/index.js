import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text, color }) => (
  <button onClick={onClick} style={{ backgroundColor: color }}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, bad, neutral, all }) => {
  if (all > 0){
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={(good-bad)/all} />
          <StatisticLine text="positive" value ={(good/all)*100 + " %"} />
        </tbody>
      </table>
    )
  }
  else{
    return( 
      <p>No feedback given yet.</p>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  
  return (
    <>
    <h2>Give feedback for Unicafe!</h2>
    <Button onClick={handleGoodClick} text={"Good"} color={'green'} />
    <Button onClick={handleNeutralClick} text={"Neutral"} color={'orange'}/>
    <Button onClick={handleBadClick} text={"Bad"} color={'red'}/>

    <h3>Statistics</h3>
    <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
