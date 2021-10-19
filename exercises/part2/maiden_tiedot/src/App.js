import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {
  console.log('filter.length', filter.length)
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
      <button>show</button>
    </div>
  )
}

const CountryInformation = ({ country }) => {
  console.log('country', country)
  console.log('country.altSpellings', country.altSpellings[0])
  const code = country.altSpellings[0]
  const languages = Object.values(country.languages)
  const osoite = 'https://www.countryflags.io/' + code + '/flat/64.png'
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      {languages.map(language => <Languages language={language}></Languages>)}
      <img src={osoite} width="200px" height="200px"></img>
    </div>
  )
}

const Languages = ({ language }) => {
  return (
    <div>{language}</div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
        console.log('promise fullfilled')
        setCountries(response.data)
      })

  }, [])

  console.log('render')
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
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
      <Countries countries={countries} filter={filter}></Countries>
    </div>
  )
}

export default App
