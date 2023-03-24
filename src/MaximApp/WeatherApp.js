import Weather from 'components/dashboards/default/Weather';
import React, { useContext, useRef } from 'react';
import { Button, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { FormControl, Stack } from 'react-bootstrap/esm';
import { WeatherContext } from './context/Context';
import { ADD_CITY } from './redux_types/weatherTypes';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';

export default function WeatherApp() {
  const cityInput = useRef();
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const { weatherState, weatherDispatch } = useContext(WeatherContext);
  async function getCord(city) {
    try {
      const data = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherApiKey}`
      );
      const [json] = await data.json();
      console.log(json);
      const props = {
        city: json.name,
        lat: json.lat,
        lon: json.lon
      };
      return props;
    } catch (error) {
      console.error(error);
    }
  }

  async function getWeather({ lat, lon, city }) {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
      );
      const json = await data.json();
      const newWeather = {
        city: city,
        condition: json.weather[0].main,
        precipitation: json.main.humidity,
        temperature: json.main.temp,
        highestTemperature: json.main.temp_max,
        lowestTemperature: json.main.temp_min,
        icon: json.weather[0].icon
      };
      return newWeather;
    } catch (error) {
      console.error(error);
    }
  }

  async function submitNewCity(city) {
    if (city === '') {
      console.log('first');
      return toast(
        <span className="text-info text-center">
          Please enter a city First!
        </span>
      );
    }
    try {
      const data = await getCord(city);
      if (!data) {
        return toast(
          <span className="text-warning">
            Seems like this city doesnt Exsist!
          </span>
        );
      }
      const newWeather = data && (await getWeather(data));

      weatherDispatch({ type: ADD_CITY, payload: newWeather });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(weatherState);
  return (
    <>
      <InputGroup className="my-3">
        <FormControl
          ref={cityInput}
          placeholder="City"
          aria-label="City"
          aria-describedby="basic-addon2"
          onSubmit={() => console.log('submited')}
        />
        <Button
          onClick={() => submitNewCity(cityInput.current.value)}
          type="submit"
          variant="info"
          id="button-addon2"
        >
          ADD
        </Button>
      </InputGroup>
      <Container fluid>
        <Row className="g-3">
          {weatherState.map((ele, i) => (
            <Col key={1} md={6}>
              <Weather
                key={i}
                data={ele}
                WeatherItems={
                  <Dropdown.Item className="text-danger">Remove</Dropdown.Item>
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
