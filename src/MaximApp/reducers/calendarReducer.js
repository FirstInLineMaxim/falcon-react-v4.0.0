import {
  ADD_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT
} from 'MaximApp/redux_types/calendarTypes';
const initData = [];
export const calendarReducer = (state = initData, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EVENT: {
      return payload;
    }
    case EDIT_EVENT: {
      return;
    }
    case REMOVE_EVENT: {
      return;
    }

    default:
      return state;
  }
};
