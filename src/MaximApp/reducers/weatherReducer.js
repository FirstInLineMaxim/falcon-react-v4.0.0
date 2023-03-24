//Types
import { CHANGE_CITY } from 'MaximApp/redux_types/weatherTypes';

export const weatherReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_CITY: {
      return state;
    }

    default:
      return state;
  }
};
