import React, { useState } from 'react'

const Number = ({ person }) => {
    return (    
        <tr>
            <td>{person.name}</td>
        </tr> 
    )
}

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas'}
    ]) 

    const [ newName, setNewName ] = useState('')

    const handleChange = (event) => {   
        setNewName(event.target.value)  
    }

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
          name: newName
        }

        if (persons.map(person => person.name).includes(newName)){
            setNewName('')
            window.alert(`${newName} is already added to phonebook`)
        }
        else{
            setPersons(persons.concat(nameObject))
            setNewName('')
        }
    }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
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