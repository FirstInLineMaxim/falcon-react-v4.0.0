import Weather from 'components/dashboards/default/Weather';
import weatherIcon from 'assets/img/icons/weather-icon.png';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { ADD_CITY, REMOVE_CITY } from './redux_types/weatherTypes';
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Fuse from 'fuse.js';
import { useDebounce } from 'usehooks-ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { isIterableArray } from 'helpers/utils';

export default function WeatherApp() {
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const weatherState = useSelector(state => state);
  const weatherDispatch = useDispatch();
  //Creating Lookup for Various Cities
  const [searchInputValue, setSearchInputValue] = useState(null);
  const [autoCompleteItem, setAutoCompleteItem] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  //This React hook helps to limit that the component is re-rendered too many times.
  const debouncedValue = useDebounce(searchInputValue, 500);

  /**
   *
   * @param {string} input
   *
   */
  async function awaitCity(input) {
    setLoading(true);
    const lookup = `https://openweathermap.org/data/2.5/find?&q=${input}&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1681306893654`;
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

      setAutoCompleteItem(data.list);
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {object} city
   * @returns {getWeather}
   * {@link getWeather}
   */
  async function submitNewCity(city) {
    if (city === '') {
      return toast(
        <span className="text-info text-center">
          Please enter a city First!
        </span>
      );
    }
    try {
      const newWeather = await getWeather(city);
      //Handels duplicates in the state
      if (
        weatherState.find(
          ele =>
            ele.city === newWeather.city &&
            ele.coords.lon === newWeather.coords.lon
        )
      ) {
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
  /**
   *
   * @param {object}
   * @returns
   */
  async function getWeather({ lat, lon, city }) {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
      );
      const json = await data.json();
      console.log(json);

      const newWeather = {
        coords: { lat, lon },
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
      const item = searchResult[0];
      e.preventDefault();
      submitNewCity({
        lat: item.coord.lat,
        lon: item.coord.lon,
        city: item.name
      });
    }
    return;
  }
  function removeCity(city) {
    weatherDispatch({ type: REMOVE_CITY, payload: city });
  }
  //Effect witch only gets run after an Timeout. Awaits user end of Typing
  useEffect(() => {
    if (searchInputValue) awaitCity(searchInputValue);
  }, [debouncedValue]);

  //Effect to set the Search Result
  useEffect(() => {
    if (searchInputValue) {
      const fuseJsOptions = {
        keys: ['name']
      };
      const search = new Fuse(autoCompleteItem, fuseJsOptions)
        .search(searchInputValue)
        .map(item => item.item);
      setSearchResult(search);
    }
  }, [autoCompleteItem]);
  return (
    <>
      <Dropdown onToggle={toggle} className="search-box mb-4">
        <Dropdown.Toggle
          as="div"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          bsPrefix="toggle"
        >
          <Form className="position-relative">
            <Form.Control
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="rounded-pill search-input"
              value={searchInputValue}
              onChange={({ target }) => setSearchInputValue(target.value)}
              onClick={() => setDropdownOpen(false)}
              onKeyDown={e => handleSubmit(e)}
            />
            <FontAwesomeIcon
              icon="search"
              className="position-absolute text-400 search-box-icon"
            />

            {searchInputValue && (
              <>
                <div className="search-box-close-btn-container me-4">
                  {loading && <Spinner size="sm" />}
                </div>
                <div
                  className="search-box-close-btn-container"
                  // style={{ right: '10px', top: '8px' }}
                >
                  <FalconCloseButton
                    size="sm"
                    noOutline
                    onClick={() => setSearchInputValue('')}
                  />
                </div>
              </>
            )}
          </Form>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="scrollbar py-3" style={{ maxHeight: '24rem' }}>
            {isIterableArray(searchResult) && (
              <>
                <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                  Cities
                </Dropdown.Header>
                {searchResult.map(item => (
                  <Dropdown.Item
                    onClick={() =>
                      submitNewCity({
                        lat: item.coord.lat,
                        lon: item.coord.lon,
                        city: item.name
                      })
                    }
                    className="fs--1 px-x1 py-1 hover-primary "
                    key={item.id}
                  >
                    <Flex alignItems="center " justifyContent={'between'}>
                      <span>
                        <img
                          className=""
                          src={
                            item.weather[0]
                              ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                              : weatherIcon
                          }
                          alt=""
                          height="40"
                        />
                        <span>
                          {item.name},{item.sys.country}
                        </span>
                      </span>
                      <Badge pill bg="200" className={' fs--2'}>
                        <span className="text-black">
                          {Number.parseFloat(item.main.temp - 273.15).toFixed(
                            1
                          )}
                          °
                        </span>
                      </Badge>
                    </Flex>
                  </Dropdown.Item>
                ))}
              </>
            )}

            {searchResult.length === 0 && (
              <p className="fs-1 fw-bold text-center mb-0">No Result Found.</p>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
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
