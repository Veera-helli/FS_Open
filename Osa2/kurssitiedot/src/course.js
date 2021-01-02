import React from 'react'

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

const Total = (props) => {
  const sum = props.parts
  .map(item => item.exercises)
  .reduce((prev, curr) => prev + curr, 0)

  return (
    <h4>Number of exercises: {sum} </h4>
  )
}

export default Course