import React, { useState } from 'react'

const Number = ({ person }) => {
    return (    
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr> 
    )
}

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '045-12345678'}
    ]) 

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const handleChange = (event) => {   
        setNewName(event.target.value)  
    }

    const handleNumChange = (event) => {   
        setNewNumber(event.target.value)  
    }

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
          name: newName,
          number: newNumber
        }

        if (persons.map(person => person.name).includes(newName)){
            setNewName('')
            setNewNumber('')
            window.alert(`${newName} is already added to phonebook`)
        }
        else{
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        }
    }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <table>
          <tbody>
            {persons.map(person =>           
            <Number person={person} key={person.name} />        
            )}
          </tbody>
      </table>
    </>
  )
}

export default App