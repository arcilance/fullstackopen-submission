import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook.js";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        phonebookService.getAll().then((storedData) => setPersons(storedData));
    }, []);

    const filteredPersons =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().startsWith(filter.toLowerCase())
              );

    const addName = (event) => {
        event.preventDefault();

        if (persons.find((person) => person.name === newName)) {
            const replaceNumber = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            );

            const existingEntry = persons.find(
                (person) => person.name === newName
            );

            if (replaceNumber) {
                phonebookService
                    .updateEntry(existingEntry.id, {
                        ...existingEntry,
                        number: newNumber,
                    })
                    .then((updatedContact) => {
                        setPersons(
                            persons.map((p) =>
                                p.id !== existingEntry.id ? p : updatedContact
                            )
                        );
                    });
            }

            return;
        }

        const personsObject = {
            name: newName,
            number: newNumber,
        };

        phonebookService.create(personsObject).then((createdEntry) => {
            setPersons(persons.concat(createdEntry));
            setNewName("");
            setNewNumber("");
        });
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
            <Persons persons={filteredPersons} setPersons={setPersons} />
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

const Persons = ({ persons, setPersons }) => {
    const deleteContact = (person) => {
        if (window.confirm(`delete ${person.name}`)) {
            phonebookService.deleteEntry(person.id);
            setPersons(persons.filter((p) => p.id !== person.id));
        }
    };

    return (
        <ul>
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name} {person.number} {"  "}
                    <button onClick={() => deleteContact(person)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default App;
