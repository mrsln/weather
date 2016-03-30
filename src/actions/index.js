import fetch from 'isomorphic-fetch';

export const UPSERT_CITY   = 'UPSERT_CITY';
export const DELETE_CITY   = 'DELETE_CITY';
export const ERROR         = 'ERROR';
export const RESET_ERROR   = 'RESET_ERROR';
export const SET_CITY_LIST = 'SET_CITY_LIST';

const API_KEY = 'ec7ff474e2549898d7e4ff07b645fe29';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_COMMON_PARAMS = `units=metric&lang=ru&APPID=${API_KEY}`
const makeApiUrl    =  city      => `${API_URL}?q=${city}&${API_COMMON_PARAMS}`;
const makeGeoApiUrl = (lat, lng) => `${API_URL}?lat=${lat}&lon=${lng}&${API_COMMON_PARAMS}`;
const makeUrlById   =  id        => `${API_URL}?id=${id}&${API_COMMON_PARAMS}`;

const PLACES_URL = 'http://cities-api.herokuapp.com/city';
const makePlacesApiUrl = (snippet, location) => `${PLACES_URL}?input=${encodeURIComponent(snippet)}&location=${location}`;

const MY_CITY_URL = 'http://cities-api.herokuapp.com/mycity';
const makeMyCityApiUrl = (lat, lng) => `${MY_CITY_URL}?lat=${lat}&lng=${lng}`;

// add a city by a name
export function addCity(city) {
  return dispatch => {
    // dispatch(initCity(city));
    return fetch(makeApiUrl(city))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCity(city));
          } , 1000);
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(json     => dispatch(upsertCity(json, city)))
  };
}

export function addCityByLocation(lat, lng, name) {
  return dispatch => {
    return fetch(makeGeoApiUrl(lat, lng))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCityByLocation(lat, lng, name));
          } , 1000);
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(json     => dispatch(upsertCity(json, name)))
  };
}

export function addCityById(id, name, temperature = 0) {
  return dispatch => {
    dispatch({
      type: UPSERT_CITY,
      city: {
        id,
        name,
        temperature,
      }
    });
    // TODO: loader
    return fetch(makeUrlById(id))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCityById(id, name, temperature));
          } , 1000);
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(json     => dispatch(upsertCity(json, name)))
  };
}

export function deleteCity(i) {
  return {
    type: DELETE_CITY,
    i,
  };
}

export function addMyCity(lat, lng) {
  return dispatch => {
    return fetch(makeMyCityApiUrl(lat, lng))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addMyCity(lat, lng));
          } , 1000);
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(json => dispatch(addCityByLocation(json.Location.Lat, json.Location.Lng, json.Description)))
  }
}

// get a list of cities with the `input` in their names
export function searchCity(snippet, location) {
  return dispatch => {
    return fetch(makePlacesApiUrl(snippet, location))
      .then(response => response.json())
      .then(json     => dispatch(setCityListFromJson(json)))
  }
}

// got the list of cities for the snippet
export function setCityListFromJson(json) {
  if (!json) return setCityList([]);
  return setCityList(json);
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

export const ADDING_MODE = 'ADDING_MODE';
export const EDITING_MODE = 'EDITING_MODE';
export const DEFAULT_MODE = 'DEFAULT_MODE';
export function setMode(mode) {
  return {
    type: mode,
  };
}

export function toggleAddingMode(curMode) {
  let newMode = ADDING_MODE;
  if (curMode === ADDING_MODE) {
    newMode = DEFAULT_MODE;
  }
  return setMode(newMode);
}

export function toggleEditingMode(curMode) {
  let newMode = EDITING_MODE;
  if (curMode === EDITING_MODE) {
    newMode = DEFAULT_MODE;
  }
  return setMode(newMode);
}
