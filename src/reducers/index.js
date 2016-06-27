import { combineReducers } from 'redux';

import {
  INIT_CITY,
  UPSERT_CITY,
  ERROR,
  RESET_ERROR,
  SET_CITY_LIST,
  resetError,
  DELETE_CITY,
  DEFAULT_MODE,
  ADDING_MODE,
  EDITING_MODE,
} from '../actions';

function cities(state = [], action) {
  switch (action.type) {
    // insert the city or updates if it's already in the list
    case UPSERT_CITY:
      if (!action.city.hasOwnProperty('updated')) {
        action.city.updated = Date.now()
      }

      let found = false;
      let newState = state.map(city => {
        if (city.id === action.city.id) {
          city.temperature = action.city.temperature;
          city.updated = action.city.updated;
          found = true;
        }
        return city;
      });

      if (!found) {
        newState.push(action.city);
      }

      return newState;
    case DELETE_CITY:
      return state.filter( (city, i) => i !== action.i );
    default:
      return state;
  }
}

function cityList(state = [], action) {
  switch (action.type) {
    case SET_CITY_LIST:
      return action.list;
    default:
      return state;
  }
}

// storing a error message
function err(state = {}, action) {
  switch (action.type) {
    case ERROR:
      return {
        err: true,
        errMessage: action.message,
      }
    case RESET_ERROR:
      return {
        err: false,
        errMessage: '',
      }
    default:
      return state;
  }
}

function mode(state = DEFAULT_MODE, action) {
  if ([ADDING_MODE, EDITING_MODE, DEFAULT_MODE].indexOf(action.type) > -1) {
    return action.type;
  }
  return state;
}

const cityApp = combineReducers({
  cities,
  err,
  cityList,
  mode,
});

export default cityApp;