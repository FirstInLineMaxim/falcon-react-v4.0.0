import Weather from 'components/dashboards/default/Weather';
import React, { useRef, useState } from 'react';
import { Button, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap/esm';
import { ADD_CITY, REMOVE_CITY } from './redux_types/weatherTypes';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Fuse from 'fuse.js';
export default function WeatherApp() {
  const cityInput = useRef();

  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  // const { weatherState, weatherDispatch } = useContext(WeatherContext);
  const weatherState = useSelector(state => state);
  const weatherDispatch = useDispatch();
  //Fetch to get city Name,lat,lon

  async function getCord(city) {
    try {
      const data = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherApiKey}`
      );
      const [json] = await data.json();
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
  //Creating Lookup for Various Cities
  const [searchInputValue, setSearchInputValue] = useState('Berlin');
  const [autoCompleteItem, setAutoCompleteItem] = useState([]);
  //This React hook helps to limit that the component is re-rendered too many times.
  const debouncedValue = useAsyncDebounce(searchInputValue, 500);
  async function awaitCity(input) {
    const lookup = `https://openweathermap.org/data/2.5/find?&appid=d3085dc00e744cef703a6ec04657f8d8https://openweathermap.org/data/2.5/find?callback=jQuery19101502834364540495_1681306893651&q=${input}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1681306893653`;
    try {
      const json = await fetch(lookup, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const data = await json.json();
      console.log(data);

      setAutoCompleteItem(data.list);
    } catch (error) {
      console.error(error);
    }
  }
  const fuseJsOptions = {
    keys: ['name']
  };
  let searchResult = new Fuse(autoCompleteItem, fuseJsOptions)
    .search(searchInputValue)
    .map(item => item.item);
  console.log(searchResult);

  //

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

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      submitNewCity(cityInput.current.value);
    }
    return;
  }
  async function submitNewCity(city) {
    if (
      weatherState.filter(e => e.city.toLowerCase() === city.toLowerCase())
        .length > 0
    ) {
      return toast(
        <span className="text-info text-center">Cant add same city Twice.</span>
      );
    }
    if (city === '') {
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
      //Handels duplicates in the state
      if (weatherState.find(ele => ele.city === newWeather.city)) {
        return toast(
          <span className="text-info text-center">
            Cant add same city Twice.
          </span>
        );
      }
      weatherDispatch({ type: ADD_CITY, payload: newWeather });
    } catch (error) {
      console.log(error);
    }
  }
  function removeCity(city) {
    weatherDispatch({ type: REMOVE_CITY, payload: city });
  }
  return (
    <>
      <InputGroup className="my-3">
        <FormControl
          ref={cityInput}
          placeholder="City"
          aria-label="City"
          aria-describedby="basic-addon2"
          onChange={e => setSearchInputValue(e.target.value)}
          onKeyDown={e => handleSubmit(e)}
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
            <Col key={i} md={6} lg={4}>
              <Weather
                key={i}
                data={ele}
                WeatherItems={
                  <Dropdown.Item
                    data-city={ele.city}
                    className="text-danger"
                    onClick={e => removeCity(e.target.dataset.city)}
                  >
                    Remove
                  </Dropdown.Item>
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
