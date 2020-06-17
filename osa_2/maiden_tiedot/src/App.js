import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const Country = ({country}) => {

  const [weatherData, setWeather] = useState({current:[{temperature: 0,
    wind_speed:0 , wind_dir: "", weather_icons: ""
  }
  ]})

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: country.capital
        }})
      .then(response => {
        setWeather(response.data.current)
      })
    },[])


  return(
    <div>
      <h1>{country.name}</h1>
      <p> 
        capital {country.capital} <br/>
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt = "" height = "200"/>
  <h2>Weather in {country.capital}</h2>
  <p>temperature: {weatherData.temperature}</p>
  <img src={weatherData.weather_icons} alt="" height="60"/>
  <p>wind: {weatherData.wind_speed}kph direction {weatherData.wind_dir}</p>
    </div>
  )
}

const Data = ({data, filter, setFilter, weatherData}) => {
  if (data.length !== 0){
    const to_show = data.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (to_show.length > 10) {
      return (
        <p>Too many results</p>
      )
    }else if (to_show.length <= 10 && to_show.length > 1) {
      return(
        <ul>
          {to_show.map(country => 
            <li key={country.name}>
              {country.name}<button onClick={() => setFilter(country.name)}>show</button>
            </li>)}
        </ul>
      )
    }else if (to_show.length === 0) {
      return(
        <p>No results</p>
      )
    }
    return(
      <Country country = {to_show[0]} weatherData = {weatherData}></Country>
    )
  }
  return (<div>No data</div>)
}

function App() {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })

  },[])

  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <form>
        find countries<input onChange={handleFilter}></input>
      </form>
      <Data data = {data} filter = {filter} setFilter = {setFilter}></Data>
    </div>
  )
}

export default App;
