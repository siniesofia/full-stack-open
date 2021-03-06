import React, { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {
  const [ allCountries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  // const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
        setCountries(response.data)
      })

  }, [])

  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  console.log('allCountries', allCountries[0])

  const Countries = ({ countries, filter }) => {
    const matches = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())).length
    if (matches > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (matches > 1) {
      return (
        <div>
          {countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
          .map(country => <CountryList key={country.name.common} country={country}></CountryList>)}
        </div>
      )
    } else if (matches === 1){
      return (
        <div>
          {countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
          .map(country => <CountryInformation key={country.name.common} country={country}></CountryInformation>)}        
        </div>
      )
    } else {
      return (
        <div>nothing to show</div>
      )
    }
  
  }
  
  const CountryList = ({ country }) => {
    return (
      <div>
        {country.name.common}
        {" "}
        <button onClick={() => {setFilter(country.name.common)}}>show</button>
      </div>
    )
  }

  const Flag = ({ flag }) => {
    const footerStyle = {
      fontSize: 200
    }
    return (
      <div style={footerStyle}>{flag}</div>
    )
  }
  
  const CountryInformation = ({ country }) => {
    const code = country.altSpellings[0]
    const languages = Object.values(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        {languages.map(language => <Languages key={country.name} language={language}></Languages>)}
        <Flag key={country.name} flag={country.flag}></Flag>
      </div>
    )
  }
  
  const Languages = ({ language }) => {
    return (
      <div>{language}</div>
    )
  }

  return (
    <div>
      <form>
        <div>
          find countries
          <input 
          value={filter}
          onChange={handleFilterChange}/>
        </div>
      </form>
      <Countries countries={allCountries} filter={filter}></Countries>
    </div>
  )
}

export default App

// teht??v?? 2.14 puuttuu


