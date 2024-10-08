import { useState,useEffect } from 'react';
import { Names } from './components/Names';
import nameService from './service/name';
import './index.css';

// const Notification = ({successMsg}) => {
// return (
//   <div className='successMsg'>{successMsg}</div>
// )
// }

const Filter = ({searchPerson,handleSearchPerson}) => {
 return (
<div>
  filter shown with:{" "} <input value={searchPerson} onChange={handleSearchPerson}/>
        </div>
 ) 
}

const PersonForm = ({addName,newName,handleNameChange,newNumber,handleNumberChange}) => {
return (
  <div>
    {/* {successMsg && <Notification successMsg={successMsg}/>} */}
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
  </div>
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
  const [successMsg,setSuccessMsg] = useState ('');
  const [errorMsg,setErrorMsg] = useState ('');

  const Notification = ({message,isError}) => {
    if (!message) {
      return null;
    }
    const className = isError ? 'errorMsg' : 'successMsg';
    return (
      <div className={className}>{message}</div>
    )
  }

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

    const nameExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase() );

    const nameObject = {
      // id : persons.length+1,
      name : newName,
      number : newNumber
    };

    if (nameExists) {
      const confirmed = window.confirm(`${nameExists.name} is already added to the phonebook,replace the old number with one ?`);
      if (!confirmed) {
       // if user doesn't confirm the entry to be true,do nothing.
       return ;
      }

      // update logic
      nameService.update(nameExists.id, nameObject)
    .then((updatedPerson) => {
      setPersons((prevPersons) =>
        prevPersons.map((person) =>
          person.id === nameExists.id ? updatedPerson : person
        )
      );
      setFilterPerson((prevFilteredPerson) =>
        prevFilteredPerson.map((person) =>
          person.id === nameExists.id ? updatedPerson : person
        )
      );

      setSuccessMsg(`${updatedPerson.name} has been successfully updated.`);
      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
    })
    .catch((error) => {
      console.error('error updating the number', error.message);
      setErrorMsg(`Information: ${nameExists.name} has already been removed from the server.`);
      setTimeout(() => {
        setErrorMsg('');
      }, 4000);
    });
}  else {
      // adding new person details to db.json
    nameService.create(nameObject)
    .then( returnedPerson => {
      console.log(returnedPerson);
        setPersons(persons.concat(returnedPerson));
    setFilterPerson(filterPerson.concat(returnedPerson));
    setSuccessMsg(`${returnedPerson.name} is successfully added.`);
    setTimeout(()=>{
      setSuccessMsg('');
    },4000);
    
    }).catch((error) => {
      console.error('error updating the number',error.message);
      alert('error updating the number');
  });
    }
    setNewName('');
    setNewNumber('');
  }

    // deleting a person from db.json

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
      <Notification message={successMsg} isError={false}/>
    <Notification message={errorMsg} isError={false}/>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Person filterPerson={filterPerson} deletePerson={deletePerson}/>
      {/* completed : 36/60 */}
    </div>
  )
}

export default App