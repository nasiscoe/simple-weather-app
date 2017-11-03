// Exports json from OpenWeatherMap api call for 5 day KC forecast
export default function fetchWeather() {
  let url = `https://api.openweathermap.org/data/2.5/forecast?id=4393217&APPID=ddb5f2022a24c803a42f185e881194c2&units=imperial`

  return fetch(url).then((response) => response.json())
}
