import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}  />
      <Total parts={props.course.parts} />
    </>
  )
}

const Header = (props) => {
  //console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <tr>
      <td>{props.part}</td>
      <td>{props.exercises}</td>
    </tr>
  )
}

const Content = (props) => {
  return (
    <table>
        <tbody>
            {props.parts.map(part =>
            <Part part={part.name} exercises={part.exercises} key={part.id}/>        
            )}      
        </tbody>
    </table>
  )
}
/*      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={(good-bad)/all} />
          <StatisticLine text="positive" value ={(good/all)*100 + " %"} />
        </tbody>
      </table>    

<div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
    */

const Total = (props) => {
  const sum = props.parts
  .map(item => item.exercises)
  .reduce((prev, curr) => prev + curr, 0)

  return (
    <h4>Number of exercises: {sum} </h4>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 10,
        id: 2
      },
      {
        name: 'Testing part',
        exercises: 2,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
