import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import weatherService from "./services/weatherService";
import SearchBox from "./components/SearchBox";
import CountrySearchReuslt from "./components/CountrySearchResult";

const App = () => {
    const [searchBox, setSearchBox] = useState("");
    const [countries, setCountries] = useState([]);
    const [storedWeatherData, setStoredWeatherData] = useState(null);

    useEffect(() => {
        countryService.getAllCountries().then((countries) => {
            setCountries(countries);
        });
    }, []);

    const filteredCountries = countries.filter((country) => {
        return country.name.common
            .toLowerCase()
            .includes(searchBox.toLowerCase());
    });

    useEffect(() => {
        if (filteredCountries.length === 1) {
            weatherService
                .getCurrentWeather(
                    filteredCountries[0].capitalInfo.latlng[0],
                    filteredCountries[0].capitalInfo.latlng[1]
                )
                .then((data) => setStoredWeatherData(data));
        }
    }, [searchBox]);

    const handleSearchBoxChange = (event) => {
        setSearchBox(event.target.value);
    };

    return (
        <div>
            <SearchBox
                searchBox={searchBox}
                handleSearchBoxChange={handleSearchBoxChange}
            />
            <CountrySearchReuslt
                filteredCountries={filteredCountries}
                setSearchBox={setSearchBox}
                storedWeatherData={storedWeatherData}
            />
        </div>
    );
};

export default App;
