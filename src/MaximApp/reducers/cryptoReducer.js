//Types
import data from '../data/crypto.json';
const initData = data;

export const cryptoReducer = (state = initData, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
