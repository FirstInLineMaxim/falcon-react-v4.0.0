import { ADD_EVENT } from 'MaximApp/redux_types/calendarTypes';
const initData = [];
export const calendarReducer = (state = initData, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EVENT: {
      return payload;
    }

    default:
      return state;
  }
};
