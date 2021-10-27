const CheckForName = (persons, newName) => {
  const length = persons.persons.length
  const name = newName.newName
  for (let i =0; i < length; i++) {
    if (persons.persons[i].name === name) {
      window.alert(`${name} is already added to phonebook`)
      return false
    }
  }
  return true
}

export default CheckForName