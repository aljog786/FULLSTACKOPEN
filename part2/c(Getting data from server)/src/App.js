import { useState,useEffect } from 'react';
// import axios from "axios";
import { Names } from './components/Names';
import nameService from './service/name';

const Filter = ({searchPerson,handleSearchPerson}) => {
 return (
<div>
  filter shown with:{" "} <input value={searchPerson} onChange={handleSearchPerson}/>
        </div>
 ) 
}

const PersonForm = ({addName,newName,handleNameChange,newNumber,handleNumberChange}) => {
return (
  <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)
}

const Person = ({filterPerson,deletePerson}) => {
  return (
    <div>
    {filterPerson.map((person) => {
        return <Names key={person.id} person={person} deletePerson={deletePerson}/>
      })}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson,setSearchPerson] = useState("");
  const [filterPerson,setFilterPerson] = useState([]);

  const hook = () => {
    console.log('effect');
    nameService
    .getAll()
    .then((initialPerson) => {
    console.log('promise fullfilled');
    setPersons(initialPerson);
    setFilterPerson(initialPerson);
    })
    .catch(error => {
    console.error('fetching failed',error);
    })
  }

  useEffect(hook,[]);

  console.log("render",persons.length,'persons');
  

  const addName = (event) => {

    event.preventDefault();
    console.log(event.target);

    const nameExists = persons.some((person) => person.name === newName );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    } else {
      alert(`${newName} sucessfully added`);

    }
    const nameObject = {
      // id : persons.length+1,
      name : newName,
      number : newNumber
    };

    // adding new person details to db.json
    nameService.create(nameObject)
    .then( returnedPerson => {
      console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
    setFilterPerson(filterPerson.concat(returnedPerson));
    setNewName('');
    setNewNumber('');
    });

  }

  const deletePerson = (id,name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (!confirmDelete) {
      return;
    }
    nameService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setFilterPerson(filterPerson.filter(person => person.id !== id))
    })
    .catch((error) => {
      console.log('Error deleting person', error.message);
      alert('Error deleting person');
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearchPerson = (event) => {
    console.log(event.target.value);
    setSearchPerson(event.target.value);

    const filterItems = persons.filter((person) => 
       person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilterPerson(filterItems);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}/>
      <h3>Add a new</h3>
      <PersonForm  addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Person filterPerson={filterPerson} deletePerson={deletePerson}/>
      {/* completed : 33/60 */}
    </div>
  )
}

export default App