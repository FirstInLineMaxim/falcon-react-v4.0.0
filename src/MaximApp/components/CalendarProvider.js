import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { CalendarContext } from 'MaximApp/context/Context';
import { calendarReducer } from 'MaximApp/reducers/calendarReducer';

const CalendarProvider = ({ children }) => {
  const initData = []; //Redux State
  const [calendarState, calendarDispatch] = useReducer(
    calendarReducer,
    initData
  ); //Redux Dispatch

  return (
    <CalendarContext.Provider
      value={{
        calendarState,
        calendarDispatch
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
//children validation
CalendarProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CalendarProvider;
