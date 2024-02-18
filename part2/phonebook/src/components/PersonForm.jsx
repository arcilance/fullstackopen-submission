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

export default PersonForm;
