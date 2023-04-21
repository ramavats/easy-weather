import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [humidity, setHumidity] = useState('');

  function fetchWeather(latitude, longitude) {
    const apiKey = '92a0917a9db15d55e1ecd362363e3e3e';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCity(data.name);
        setTemperature(data.main.temp);
        setFeelsLike(data.main.feels_like);
        setTempMin(data.main.temp_min);
        setTempMax(data.main.temp_max);
        setHumidity(data.main.humidity);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleGetWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(latitude, longitude);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  return (
    <div>
      <h1>{city}</h1>
      <p>Today's Temperature is {temperature}</p>
      <p>Feels like {feelsLike}</p>
      <p>Minimum temperature {tempMin}</p>
      <p>Maximum temperature {tempMax}</p>
      <p>Humidity {humidity}</p>
      <button onClick={() => handleGetWeather()}>Get Weather</button>
    </div>
  );
}

export default App;
