import React           from 'react';
import { render }      from 'react-dom';
import App             from './App';
import { createStore } from 'redux';
import { Provider }    from 'react-redux';
import cityApp         from './reducers';

let store = createStore(cityApp);

let rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);