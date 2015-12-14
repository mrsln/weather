import { combineReducers } from 'redux';
import { ADD_CITY }        from '../actions';

function cities(state = [], action) {
	switch (action.type) {
		case ADD_CITY:
			return [
				...state,
				{
					name: action.city.name,
					temperature: action.city.temperature,
				}
			];
		default:
			return state;
	}
}

const cityApp = combineReducers({
	cities,
});

export default cityApp;