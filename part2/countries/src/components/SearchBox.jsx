const SearchBox = ({ searchBox, handleSearchBoxChange }) => {
    return (
        <div>
            find countries
            <input value={searchBox} onChange={handleSearchBoxChange} />
        </div>
    );
};

export default SearchBox;
