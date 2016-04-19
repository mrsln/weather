'use strict';

import fetch from 'isomorphic-fetch';

export const geoLocate = (cb) => {
  const url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIByGohE7Nvw2OBTgLiqMOw0OgtJIkrpc';
  fetch(url, {method: 'POST'})
    .then(response => response.json())
    .then(data => cb(data.location.lat, data.location.lng));
};