import React, { useState } from 'react'


const Filter = ({ handleFilterChange, newFilter}) => {
    return (    
    <form>
        <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
    </form>
    )
}

const PersonForm = ({ newName, newNumber, handleChange,
     handleNumChange, persons, setNewName, setNewNumber, setPersons}) => {

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
          name: newName,
          number: newNumber, 
          showing: true
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
        <form onSubmit={addName}>
            <div>name: <input value={newName} onChange={handleChange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumChange} /></div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons }) => {
    return (    
        <table>
            <tbody>
            {persons.filter(person => person.showing === true).map(person =>           
            <Number person={person} key={person.name} />        
            )}
            </tbody>
        </table>
    )
}

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
        { name: 'Arto Hellas', number: '045-12345678', showing: true}
    ]) 

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter] = useState('')
    
    const handleChange = (event) => {   
        setNewName(event.target.value)  
    }

    const handleNumChange = (event) => {   
        setNewNumber(event.target.value)  
    }

    const handleFilterChange = (event) => {   
        setNewFilter(event.target.value)
        if (event.target.value !== ''){
            for (let index = 0; index < persons.length; index++) {
                const element = persons[index];
                const name = element.name.toLowerCase()
                if (!name.includes(event.target.value.toLowerCase())){
                    element.showing = false
                }
                else{
                    element.showing = true
                }
            }
        }
        else{
            persons.forEach(person => person.showing = true)
        }
    }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      
      <h3>Add new</h3>
      <PersonForm newName={newName} 
      newNumber={newNumber} handleChange={handleChange} 
      handleNumChange={handleNumChange} persons={persons} 
      setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} />
    
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </>
  )
}

export default App