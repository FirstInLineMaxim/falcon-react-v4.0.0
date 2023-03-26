import { ADD_EVENT } from 'MaximApp/redux_types/calendarTypes';

export const calendarReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EVENT: {
      return payload;
    }

    default:
      return state;
  }
};
