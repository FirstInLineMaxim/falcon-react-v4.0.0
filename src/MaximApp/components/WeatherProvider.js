import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import {
  rootWeatherReducer,
  weatherReducer
} from 'MaximApp/reducers/weatherReducer';
// import { WeatherContext } from 'MaximApp/context/Context';
import { Provider } from 'react-redux';
const initData = []; //Redux State
const store = createStore(weatherReducer);
const WeatherProvider = ({ children }) => {
  const [weatherState, weatherDispatch] = useReducer(weatherReducer, initData); //Redux Dispatch

  return (
    <Provider
      store={store}
      // value={{
      //   weatherState,
      //   weatherDispatch
      // }}
    >
      {children}
    </Provider>
  );
};
//children validation
WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WeatherProvider;
