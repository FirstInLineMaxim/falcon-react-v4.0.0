import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { weatherReducer } from 'MaximApp/reducers/weatherReducer';
import { WeatherContext } from 'MaximApp/context/Context';

const WeatherProvider = ({ children }) => {
  const initData = []; //Redux State
  const [weatherState, weatherDispatch] = useReducer(weatherReducer, initData); //Redux Dispatch

  return (
    <WeatherContext.Provider
      value={{
        weatherState,
        weatherDispatch
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
//children validation
WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WeatherProvider;
