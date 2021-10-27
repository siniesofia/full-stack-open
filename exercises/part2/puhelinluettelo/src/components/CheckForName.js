const CheckForName = (persons, newName) => {
  const length = persons.persons.length
  const name = newName.newName
  for (let i =0; i < length; i++) {
    if (persons.persons[i].name === name) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        return persons.persons[i].id
      } else {
        return "dont add anything"
      }
    }
  }
  return "add name and number"
}

export default CheckForName