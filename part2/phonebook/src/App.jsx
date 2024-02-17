import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((resp) => setPersons(resp.data));
    }, []);

    const filteredPersons =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().startsWith(filter.toLowerCase())
              );

    const addName = (event) => {
        event.preventDefault();

        // console.log(persons.find({ name: newName }));
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} already added to phonebook`);
            return;
        }

        const personsObject = {
            name: newName,
            number: newNumber,
        };
        setPersons(persons.concat(personsObject));
        setNewName("");
        setNewNumber("");
    };

    const handleOnChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleOnChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h3>Add New</h3>
            <PersonForm
                addName={addName}
                newName={newName}
                newNumber={newNumber}
                handleOnChangeName={handleOnChangeName}
                handleOnChangeNumber={handleOnChangeNumber}
            />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} />
        </div>
    );
};

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            filter shown with
            <input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
            />
        </div>
    );
};

const PersonForm = ({
    addName,
    newName,
    newNumber,
    handleOnChangeName,
    handleOnChangeNumber,
}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleOnChangeName} />
            </div>
            <div>
                number:{" "}
                <input value={newNumber} onChange={handleOnChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map((person) => (
                <li key={person.name}>
                    {person.name} {person.number}
                </li>
            ))}
        </ul>
    );
};

export default App;
