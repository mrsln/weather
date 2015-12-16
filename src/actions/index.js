export const INIT_CITY   = 'INIT_CITY';
export const UPSERT_CITY = 'UPSERT_CITY';
export const ERROR       = 'ERROR';
export const RESET_ERROR = 'RESET_ERROR';

const API_KEY = 'ec7ff474e2549898d7e4ff07b645fe29';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_COMMON_PARAMS = `units=metric&lang=ru&APPID=${API_KEY}`
const makeApiUrl    =  city      => `${API_URL}?q=${city}&${API_COMMON_PARAMS}`;
const makeGeoApiUrl = (lat, lon) => `${API_URL}?lat=${lat}&lon=${lon}&${API_COMMON_PARAMS}`;
const makeUrlById   =  id        => `${API_URL}?id=${id}&${API_COMMON_PARAMS}`;

export function addCity(city) {
	return dispatch => {
		// dispatch(initCity(city));
		return fetch(makeApiUrl(city))
			.then(response => response.json())
			.then(json     => dispatch(updsertCity(json)))
	};
}

export function addCityByLocation(lat, lon) {
	return dispatch => {
		// TODO: show a loading gif. dispatch(initGeoCity());, updsertCity => updateGeoCity
		return fetch(makeGeoApiUrl(lat, lon))
			.then(response => response.json())
			.then(json     => dispatch(updsertCity(json)))
	};
}

export function addCityById(id) {
	return dispatch => {
		// TODO: loader
		return fetch(makeUrlById(id))
			.then(response => response.json())
			.then(json     => dispatch(updsertCity(json)))
	};
}

export function initCity(city) {
	return {
		type: INIT_CITY,
		city,
	};
}

export function updsertCity(json) {
	if (json.cod !== 200) {
		return {
			type: ERROR,
			message: json.message,
		};
	}

	const city = {
		name: json.name,
		temperature: json.main.temp,
		id: json.id,
	};
	return {
		type: UPSERT_CITY,
		city
	};
}

export function resetError() {
	return {
		type: RESET_ERROR,
	};
}