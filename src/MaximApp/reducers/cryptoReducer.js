//Types
import placeholder from '../data/crypto.json';
const { data } = placeholder;

export const cryptoReducer = (state = data, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
