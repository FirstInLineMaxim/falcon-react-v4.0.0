import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { weatherReducer } from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  calendar: calendarReducer
});
export default rootReducer;
