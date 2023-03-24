import Weather from 'components/dashboards/default/Weather';
import React, { useContext, useEffect } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap/esm';
import { WeatherContext } from './context/Context';
// const weather = {
//   city: 'New York City',
//   condition: 'Sunny',
//   precipitation: '50%',
//   temperature: 31,
//   highestTemperature: 32,
//   lowestTemperature: 25
// };
export default function WeatherApp() {
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const { weatherState, weatherDispatch } = useContext(WeatherContext);
  async function getCord(city) {
    try {
      const data = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${'berlin'}&appid=${weatherApiKey}`
      );
      const [json] = await data.json();
      const props = {
        lat: json.lat,
        lon: json.lon
      };
      return props;
    } catch (error) {
      console.error(error);
    }
  }
  async function getWeather() {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${'52.5170365'}&lon=${'13.3888599'}&appid=${weatherApiKey}`
      );
      const json = await data.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // const data = getCord();
    // getWeather();
  }, []);
  console.log(weatherState);
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="City"
          aria-label="City"
          aria-describedby="basic-addon2"
          onSubmit={console.log('submited')}
        />
        <Button type="submit" variant="outline-info" id="button-addon2">
          Button
        </Button>
      </InputGroup>
      <Weather data={weatherState} />
    </>
  );
}

const reponse = {
  coord: {
    lon: 13.3889,
    lat: 52.517
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d'
    }
  ],
  base: 'stations',
  main: {
    temp: 287.99,
    feels_like: 287.07,
    temp_min: 287.05,
    temp_max: 288.72,
    pressure: 990,
    humidity: 59
  },
  visibility: 10000,
  wind: {
    speed: 6.69,
    deg: 270
  },
  clouds: {
    all: 20
  },
  dt: 1679673583,
  sys: {
    type: 2,
    id: 2009543,
    country: 'DE',
    sunrise: 1679634038,
    sunset: 1679678697
  },
  timezone: 3600,
  id: 6545310,
  name: 'Mitte',
  cod: 200
};
