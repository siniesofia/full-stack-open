import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  console.log('country', country)

  return (
    <div>
      {country.name.common}
    </div>
  )
}

const App = () => {
    const [ countries, setCountries] = useState([])

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

  return (
    <div>
      {countries.map(country => <Country country={country}></Country>)}
    </div>
  )
}

export default App
