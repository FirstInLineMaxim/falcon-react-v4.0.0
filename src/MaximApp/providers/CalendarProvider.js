import React from 'react';
import PropTypes from 'prop-types';

import { calendarReducer } from 'MaximApp/reducers/calendarReducer';

//Redux
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
const store = createStore(calendarReducer, composeWithDevTools());

const CalendarProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
//children validation
CalendarProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CalendarProvider;
