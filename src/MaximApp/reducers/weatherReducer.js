export const weatherReducer = (state, payload) => {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_CITY': {
      return state;
    }

    default:
      break;
  }
};
