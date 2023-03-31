import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { cryptoReducer } from './cryptoReducer';
import { weatherReducer } from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  calendar: calendarReducer,
  crypto: cryptoReducer
});
export default rootReducer;
