import WeatherInfo from "./WeatherInfo";
const CountryInfo = ({ country, storedWeatherData }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h4>Languages:</h4>
            <ul>
                {Object.values(country.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="" />
            <WeatherInfo
                country={country}
                storedWeatherData={storedWeatherData}
            />
        </div>
    );
};
export default CountryInfo;
