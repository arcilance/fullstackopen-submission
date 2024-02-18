import phonebookService from "../services/phonebook.js";

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

export default Persons;
