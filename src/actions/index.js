export const UPSERT_CITY   = 'UPSERT_CITY';
export const DELETE_CITY   = 'DELETE_CITY';
export const ERROR         = 'ERROR';
export const RESET_ERROR   = 'RESET_ERROR';
export const SET_CITY_LIST = 'SET_CITY_LIST';

const API_KEY = 'ec7ff474e2549898d7e4ff07b645fe29';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_COMMON_PARAMS = `units=metric&lang=ru&APPID=${API_KEY}`
const makeApiUrl    =  city      => `${API_URL}?q=${city}&${API_COMMON_PARAMS}`;
const makeGeoApiUrl = (lat, lon) => `${API_URL}?lat=${lat}&lon=${lon}&${API_COMMON_PARAMS}`;
const makeUrlById   =  id        => `${API_URL}?id=${id}&${API_COMMON_PARAMS}`;

const PLACES_URL = 'http://api.geonames.org/search?maxRows=10&username=demo&type=json&lang=ru&countryBias=ru&orderby=population&style=medium&isNameRequired=true&cities=cities5000';
const makePlacesApiUrl = snippet => `${PLACES_URL}&name_startsWith=${encodeURIComponent(snippet)}`;

// add a city by a name
export function addCity(city) {
	return dispatch => {
		// dispatch(initCity(city));
		return fetch(makeApiUrl(city))
			.then(response => response.json())
			.then(json     => dispatch(upsertCity(json, city)))
	};
}

export function addCityByLocation(lat, lon) {
	return dispatch => {
		// TODO: show a loading gif. dispatch(initGeoCity());, upsertCity => updateGeoCity
		return fetch(makeGeoApiUrl(lat, lon))
			.then(response => response.json())
			.then(json     => dispatch(upsertCity(json)))
	};
}

export function addCityById(id, name) {
	return dispatch => {
		// TODO: loader
		return fetch(makeUrlById(id))
			.then(response => response.json())
			.then(json     => dispatch(upsertCity(json, name)))
	};
}

export function deleteCity(i) {
	return {
		type: DELETE_CITY,
		i,
	};
}

// get a list of cities with the `input` in their names
export function searchCity(snippet) {
	return dispatch => {
		return fetch(makePlacesApiUrl(snippet))
			.then(response => response.json())
			.then(json     => dispatch(setCityListFromJson(json)))
	}
}

// got the list of cities for the snippet
export function setCityListFromJson(json) {
	if (!json.geonames) return setCityList([]);

	// creating an array of strings like ['Saint-Petersburg, Russia']
	const list = json.geonames.map( city => ({name: city.name, country: city.countryName, id: city.geonameId}) );
	return setCityList(list);
}

export function setCityList(list) {
	return {
		type: SET_CITY_LIST,
		list,
	};
}

// insert or update a city with the json from API
export function upsertCity(json, forceName) {
	if (json.cod !== 200) {
		return {
			type: ERROR,
			message: json.message,
		};
	}

	const city = {
		name:        forceName ? forceName : json.name,
		temperature: Math.round(json.main.temp),
		id:          json.id,
	};
	return {
		type: UPSERT_CITY,
		city,
	};
}

export function resetError() {
	return {
		type: RESET_ERROR,
	};
}