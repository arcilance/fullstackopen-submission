const WeatherInfo = ({ country, storedWeatherData }) => {
    if (storedWeatherData == null) {
        return <div></div>;
    }
    return (
        <div>
            <h4>Weather in {country.capital}</h4>
            <p>Temperature {storedWeatherData.temp} Celsius</p>
            <img src={storedWeatherData.icon} alt="Weather icon" />
            <p>Wind Speed {storedWeatherData.wind} m/s</p>
        </div>
    );
};
export default WeatherInfo;
