import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Filter = ({ handleFilterChange, newFilter}) => {
  return (    
    <form>
        <div>Find countries: <input value={newFilter} onChange={handleFilterChange}/></div>
    </form>
  )
}

const Language = ({ name }) => (    
  <li>{name}</li>  
)

const Country = ({obj, weatherdata, setWeatherdata}) => {
  //NOTE: the weather source server `http://api.weatherstack.com/current` was not stable 
  // and could unfortunately only access New York data
  //, which lead me to show that data only (for all countries)
  return (    
    <div>
      <h1>{obj.name}</h1>
      <p>capital: {obj.capital}</p>
      <p>population: {obj.population}</p>
      <h3>Languages:</h3>
      <ul>
        {obj.languages.map(language =>           
        <Language key={language.name} name={language.name}/>)}
      </ul>
      
      <img 
        src={obj.flag}
        alt="flag"
        style={{ width: "20%", margin: "10px 30px"}}
      />
      <h2>Weather in {obj.capital}</h2>
      <p>Temperature: {weatherdata.temperature} Celsius </p>
      <img 
      src={weatherdata.weather_icons[0]}
      alt="icon"
      style={{ width: "20%", margin: "10px 30px"}}
      />
      <p>Wind: {weatherdata.wind_speed} mph, direction: {weatherdata.wind_dir} </p>
      
    </div>
  )
}

const ListItem = ({country, handleSubmit}) => {
  return (    
    <tr>
      <td>{country.name}</td>
      <td>
        <form onSubmit={handleSubmit(country)}>
          <div>
            <button type="submit" >show</button>
          </div>
        </form>
      </td>
    </tr>
  )
}


const CountryList = ({filteredList, handleSubmit}) => {
  return (    
    <table>
        <tbody>
        {filteredList.map(country =>           
          <ListItem key={country.name} country={country} handleSubmit={handleSubmit}/> )}
        </tbody>
    </table>
  )
}

const Countries = ({ setNewFilter, newFilter, filteredList,
   setFilteredList, weatherdata, setWeatherdata}) => {
  
  if (newFilter !== ''){

    const handleSubmit = (country) =>(event) => {
      setFilteredList([country])
    }

    if (filteredList.length < 11 & filteredList.length > 1){
      return (    
        <CountryList filteredList={filteredList} handleSubmit={handleSubmit} />
      )
    }
    else if (filteredList.length === 0){
      return (    
        <div>
          <p>No matches :(</p>
        </div>
      )
    }
    else if (filteredList.length === 1){
      return (    
        <div>
          <Country obj={filteredList[0]} weatherdata={weatherdata} setWeatherdata={setWeatherdata} />
        </div>
      )
    }
    else {
      return (    
          <div>
            <p>Too many matches. Specify your search by writing more letters.</p>
          </div>
      )
    }
  }
  else {
    return (    
        <div>
          <p>Too many matches. Specify your search by writing more letters.</p>
        </div>
    )
  }
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter] = useState('')
  const [ filteredList, setFilteredList] = useState([])
  const [ weatherdata, setWeatherdata] = useState([]) 

  const handleFilterChange = (event) => {  
    setNewFilter(event.target.value)
    setFilteredList(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()) === true))
  }
  
  useEffect(() => { 
    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: 'all'
    }

    axios      
    .get(`http://api.weatherstack.com/current`, {params})   
    .then(response => {        // https access restricted 
        console.log('promise fulfilled 2') 
        setWeatherdata(response.data.current)   
    })
  }, []);

  useEffect(() => {  
    axios      
    .get('https://restcountries.eu/rest/v2/all')      
    .then(response => {        
        console.log('promise fulfilled 1')        
        setCountries(response.data)      
      })  
  }, [])

  return (
    <>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <Countries setNewFilter={setNewFilter} newFilter={newFilter}
       filteredList={filteredList} setFilteredList={setFilteredList} setWeatherdata={setWeatherdata} weatherdata={weatherdata}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

