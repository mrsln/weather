import { combineReducers }        from 'redux';
import { INIT_CITY, UPDATE_CITY } from '../actions';

function cities(state = [], action) {
	switch (action.type) {
		case INIT_CITY:
			return [
				...state,
				{
					name: action.city,
					temperature: '*',
				}
			];
		case UPDATE_CITY:
			return state.map(city => {
				if (city.name === action.city.name) {
					city.temperature = action.city.temperature;
				}
				return city;
			});
		default:
			return state;
	}
}

const cityApp = combineReducers({
	cities,
});

export default cityApp;