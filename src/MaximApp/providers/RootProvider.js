import React from 'react';
import PropTypes from 'prop-types';

//Redux
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import rootReducer from 'MaximApp/reducers/combinedReducer';
const store = createStore(rootReducer, composeWithDevTools());

const RootProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
//children validation
RootProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default RootProvider;
