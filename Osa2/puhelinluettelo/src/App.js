import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({ handleFilterChange, newFilter}) => {
    return (    
    <form>
        <div>filter: <input value={newFilter} onChange={handleFilterChange}/></div>
    </form>
    )
}

const PersonForm = ({ newName, newNumber, handleUpdate, handleChange,
     handleNumChange, persons, setNewName, setNewNumber, setPersons}) => {

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
          name: newName,
          number: newNumber
        }

        if (persons.map(person => person.name).includes(newName)){
            setNewName('')
            setNewNumber('')
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const id = persons.find(person => person.name === newName).id
                personService.update(id, nameObject)
                personService
                    .getAll()     
                    .then(response => {        
                        console.log('promise fulfilled')          
                        setPersons(response.data)      
                })  
            }
        }
        else{
            console.log('adding new person')
            personService      
                .create(nameObject)
                .then(response => {      
                    console.log(response)    
            })
            setNewName('')
            setNewNumber('')
        }

        personService
        .getAll()     
        .then(response => {        
            console.log('promise fulfilled')          
            setPersons(response.data)      
        })  
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

const Persons = ({ persons, newFilter, handleSubmit }) => {
    
    if (newFilter !== ''){
        return (    
            <table>
                <tbody>
                {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true).map(person =>           
                <Number person={person} key={person.id} handleSubmit={handleSubmit} />        
                )}
                </tbody>
            </table>
        )
    }
    else{
        return (    
            <table>
                <tbody>
                {persons.map(person =>           
                <Number person={person} key={person.id} handleSubmit={handleSubmit} />        
                )}
                </tbody>
            </table>
        )

    }
}

const Number = ({ person, handleSubmit }) => {
    return (    
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <form onSubmit={handleSubmit(person)}>
                    <div>
                        <button type="submit" >delete</button>
                    </div>
                </form>
            </td>
        </tr> 
    )
}

const App = () => {
    const [ persons, setPersons] = useState([]) 

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter] = useState('')
    
    const handleChange = (event) => {   
        setNewName(event.target.value)  
    }

    const handleNumChange = (event) => {   
        setNewNumber(event.target.value)  
    }

    const handleUpdate = (obj) => (event) => { 
        event.preventDefault()
          
        personService
        .update(persons.find(person => person.name === newName).id, obj)
    
        personService
            .getAll()     
            .then(response => { 
                setPersons(response.data)     
        })  
    }

    const handleSubmit = (person) =>(event) => {
        event.preventDefault()
        const str = `Do you really want to remove ${person.name}?`
        if (window.confirm(str)) {
            console.log('person id:', person.id)
            personService.remove(person.id)
            personService
                .getAll()     
                .then(response => {  
                    setPersons(response.data)     
            }) 
        }
        personService
        .getAll()     
        .then(response => {  
            setPersons(response.data)     
    }) 
    }

    useEffect(() => {    
        console.log('effect')    
        personService
            .getAll()     
            .then(response => {        
                console.log('promise fulfilled')          
                setPersons(response.data)      
            })  
    }, [])

    const handleFilterChange = (event) => {   
        setNewFilter(event.target.value)
    }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      
      <h3>Add new</h3>
      <PersonForm newName={newName} handleUpdate={handleUpdate}
      newNumber={newNumber} handleChange={handleChange} 
      handleNumChange={handleNumChange} persons={persons} 
      setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} />
    
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleSubmit={handleSubmit} />
    </>
  )
}

export default App