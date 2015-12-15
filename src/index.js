import React           from 'react';
import { render }      from 'react-dom';
import App             from './App';
import configureStore  from './store';
import { Provider }    from 'react-redux';

let store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);