import { combineReducers } from 'redux';

import {
	INIT_CITY,
	UPSERT_CITY,
	ERROR,
	RESET_ERROR,
	SET_CITY_LIST,
	resetError,
	DELETE_CITY,
} from '../actions';

function cities(state = [], action) {
	switch (action.type) {
		// insert the city or updates if it's already in the list
		case UPSERT_CITY:
			let found = false;
			let newState = state.map(city => {
				if (city.id === action.city.id) {
					city.temperature = action.city.temperature;
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

const cityApp = combineReducers({
	cities,
	err,
	cityList,
});

export default cityApp;