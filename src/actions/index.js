import fetch from 'isomorphic-fetch';
import uuid from 'uuid';

export const UPSERT_LOADING_CITY = 'UPSERT_LOADING_CITY';
export const UPSERT_CITY   = 'UPSERT_CITY';
export const DELETE_CITY   = 'DELETE_CITY';
export const ERROR         = 'ERROR';
export const RESET_ERROR   = 'RESET_ERROR';
export const SET_CITY_LIST = 'SET_CITY_LIST';

export const ADDING_MODE = 'ADDING_MODE';
export const EDITING_MODE = 'EDITING_MODE';
export const DEFAULT_MODE = 'DEFAULT_MODE';

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
    return fetch(makeApiUrl(city))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCity(city));
          } , 1000);
        }
        return response.json();
      })
      .then(json => dispatch(upsertCity(json, city)))
  };
}

export function addCityByLocation(lat, lng, name, id = uuid.v4()) {
  return dispatch => {
    dispatch(upsertLoadingCity(id, `Getting the weather for ${name}`));
    return fetch(makeGeoApiUrl(lat, lng))
      .then(response => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCityByLocation(lat, lng, name));
          } , 1000);
        }
        return response.json();
      })
      .then((json) => {
        dispatch(upsertCity(json, name, id));
        dispatch(setMode(DEFAULT_MODE));
      })
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
        updated: 0,
      }
    });
    // TODO: loader
    return fetch(makeUrlById(id))
      .then(response => {

        // have to repeat the request, because of the faulty API
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addCityById(id, name, temperature));
          } , 1000);
        }
        return response.json();
      })
      .then(json => dispatch(upsertCity(json, name)))
  };
}

export function deleteCity(i) {
  return {
    type: DELETE_CITY,
    i,
  };
}

export function addMyCity(lat, lng) {
  return (dispatch) => {
    
    const id = uuid.v4();;
    dispatch(upsertLoadingCity(id, 'Getting your city name'));

    // getting the city name
    return fetch(makeMyCityApiUrl(lat, lng))
      .then((response) => {
        if (response.status >= 400) {
          setTimeout( () => {
            dispatch(addMyCity(lat, lng));
          } , 1000);
        }
        return response.json();
      })
      .then((json) => {
        dispatch(upsertLoadingCity(id, `Getting temperature of ${json.Description}`));
        dispatch(addCityByLocation(json.Location.Lat, json.Location.Lng, json.Description, id));
      });
  }
}

function upsertLoadingCity(id, text) {
  return {
    type: UPSERT_LOADING_CITY,
    id,
    text,
  };
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
export function upsertCity(json, forceName, id) {
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
    oldId: id,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

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
