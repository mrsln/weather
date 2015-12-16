import { combineReducers } from 'redux';

import { INIT_CITY, UPSERT_CITY, ERROR, RESET_ERROR, resetError } from '../actions';

function cities(state = [], action) {
	switch (action.type) {
		case INIT_CITY:
			return [
				...state,
				{
					name: action.city,
					temperature: '*',
					id: 0,
				}
			];
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
		default:
			return state;
	}
}

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
});

export default cityApp;