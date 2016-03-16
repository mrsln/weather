import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import cityApp from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(cityApp, initialState)
}