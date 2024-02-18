import CountryInfo from "./CountryInfo";
const CountrySearchReuslt = ({
    filteredCountries,
    setSearchBox,
    storedWeatherData,
}) => {
    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    }

    if (filteredCountries.length === 1) {
        return (
            <CountryInfo
                country={filteredCountries[0]}
                storedWeatherData={storedWeatherData}
            />
        );
    } else {
        return (
            <ul>
                {filteredCountries.map((country) => (
                    <li key={country.name.official}>
                        {country.name.common}
                        <button
                            onClick={() => setSearchBox(country.name.common)}
                        >
                            Show
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
};
export default CountrySearchReuslt;
