import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { weatherReducer } from './weatherReducer';

const rootWeatherReducer = combineReducers({
  weather: weatherReducer,
  calendar: calendarReducer
});
export default rootWeatherReducer;
