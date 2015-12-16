export const INIT_CITY   = 'INIT_CITY';
export const UPSERT_CITY = 'UPSERT_CITY';

const API_KEY = 'ec7ff474e2549898d7e4ff07b645fe29';
const makeApiUrl    =  city      => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
const makeGeoApiUrl = (lat, lon) => `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`;

export function addCity(city) {
	return dispatch => {
		dispatch(initCity(city));
		return fetch(makeApiUrl(city))
			.then(response => response.json())
			.then(json => dispatch(updsertCity(json)))
	};
}

export function addCityByLocation(lat, lon) {
	return dispatch => {
		// TODO: show a loading gif. dispatch(initGeoCity());, updsertCity => updateGeoCity
		return fetch(makeGeoApiUrl(lat, lon))
			.then(response => response.json())
			.then(json => dispatch(updsertCity(json)))
	};
}

export function initCity(city) {
	return {
		type: INIT_CITY,
		city,
	};
}

export function updsertCity(json) {
	const city = {
		name: json.name,
		temperature: json.main.temp,
	};
	return {
		type: UPSERT_CITY,
		city
	};
}