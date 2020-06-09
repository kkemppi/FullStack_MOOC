import React from 'react'

const Course = ({course}) => {
    return (
    <div>
      <Header course={course.name}/>
    <ul>
      <Content parts = {course.parts}/>
    </ul>
      <Total parts = {course.parts}/>
    </div>
    )
  }

const Header = (props) => <h1>{props.course}</h1>

const Part = ({name, exercise}) => <li>{name} {exercise}</li>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(parts => <Part key= {parts.id} name = {parts.name} exercise = {parts.exercises}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  const values = parts.map(parts => parts.exercises)
  const sum = values.reduce((a, v) => a + v)
  return (
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  )
}

export default Course