//Types
import { ADD_CITY, REMOVE_CITY } from 'MaximApp/redux_types/weatherTypes';
const initData = []; //Redux State

export const weatherReducer = (state = initData, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CITY: {
      return [...state, payload];
    }
    case REMOVE_CITY: {
      const newState = state.filter(ele => ele.city !== payload);

      return newState;
    }
    default:
      return state;
  }
};
