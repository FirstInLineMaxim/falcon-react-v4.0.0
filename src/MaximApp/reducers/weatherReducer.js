//Types
import { ADD_CITY } from 'MaximApp/redux_types/weatherTypes';

export const weatherReducer = (state, action) => {
  console.log('running');
  const { type, payload } = action;
  console.log({ action });
  switch (type) {
    case ADD_CITY: {
      console.log(state, payload);

      return [...state, payload];
    }

    default:
      return state;
  }
};
