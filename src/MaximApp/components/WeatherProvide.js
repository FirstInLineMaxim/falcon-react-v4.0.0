import { useReducer } from 'react';
import { weatherReducer } from 'MaximApp/reducers/weatherReducer';

const WeatherProvide = ({ children }) => {
  const initData = { city: 'berlin' }; //Redux State
  const [weatherState, weatherDispatch] = useReducer(weatherReducer, initData); //Redux Dispatch
};
