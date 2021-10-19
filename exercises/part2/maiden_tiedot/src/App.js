import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {
  console.log('filter.length', filter.length)
  if (countries.filter(country => country.name.common.includes(filter)).length > 10) {
    return (
      <div>Too many matcches, specify another filter</div>
    )
  } else {
    return (
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(filter))
        .map(country => <CountryList key={country.name.common} country={country}></CountryList>)}
      </div>
    )
  }

}

const CountryList = ({ country }) => {
  return (
    <div>
      {country.name.common}
    </div>
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
