import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { weatherReducer } from 'MaximApp/reducers/weatherReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(weatherReducer, composeWithDevTools());
const WeatherProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
//children validation
WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default WeatherProvider;
