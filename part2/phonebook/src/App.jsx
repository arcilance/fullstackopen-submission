import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook.js";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [notification, setNotification] = useState({
        message: null,
        type: null,
    });

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
                        createTemporaryNotification(
                            `Updated number for ${updatedContact.name}`,
                            "success"
                        );
                    })
                    .catch((error) => {
                        createTemporaryNotification(
                            `Information of ${existingEntry.name} has already been deleted from server`,
                            "error"
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
            createTemporaryNotification(
                `Added ${createdEntry.name}`,
                "success"
            );
        });
    };

    const createTemporaryNotification = (message, type) => {
        setNotification({
            message,
            type,
        });
        setTimeout(() => {
            setNotification({ message: null, type: null });
        }, 2000);
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
            {notification.message === null ? (
                ""
            ) : (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
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

export default App;
