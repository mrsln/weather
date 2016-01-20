// a root container component

import React, { Component } from 'react';
import { connect }          from 'react-redux';

import {
  addCity,
  addCityByLocation,
  addCityById,
  searchCity,
  setCityList,
  resetError,
  deleteCity,
  addMyCity,
} from './actions';

import Tiles   from './components/Tiles';
import AddCity from './components/AddCity';
import Err     from './components/Err';
import Header  from './components/Header';
import Body    from './components/Body';

class App extends Component {
  
  componentDidMount() {
    if (!this.props.cities.length) {

      if (localStorage.cities) {
        // loading from the storage
        const cities = JSON.parse(localStorage.cities);
        cities.forEach(city => this.props.dispatch(addCityById(city.id, city.name)));
      } else {
        // init with the user's current location
        navigator.geolocation.getCurrentPosition(
          position =>
            this.props.dispatch(addMyCity(position.coords.latitude, position.coords.longitude))
        );
      }
    }

    setTimeout(this.updateWeather.bind(this), 3600);
  }

  saveCities(cities) {
    if (!cities) cities = [];
    localStorage.cities = JSON.stringify(cities);
  }

  updateWeather() {
    this.props.cities.forEach(city => this.props.dispatch(addCityById(city.id)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err && nextProps.err.err) {
      setTimeout(() => this.props.dispatch(resetError()), 3000);
    }
    if (this.props.cities !== nextProps.cities) {
      this.saveCities(nextProps.cities);
    }
  }

  onCitySelected(e, city) {
    this.props.dispatch(setCityList([]));
    this.props.dispatch(addCityByLocation(city.Location.Lat, city.Location.Lng, city.Description));
  }

  onKeywordsChange(e, keywords) {
    if (!keywords || !keywords.length) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        const location = position.coords.latitude + ',' + position.coords.longitude;
        this.props.dispatch(searchCity(keywords, location));
      }
    );
  }

  onCitytDelete(i) {
    this.props.dispatch(deleteCity(i));
  }

  render() {
    const {dispatch, cities, err, cityList} = this.props;
    return (
      <div>
        <Err err = {err} />

        <Header>
          <AddCity
            cityList      = {cityList}
            onInputSelect = {this.onCitySelected.bind(this)}
            onInputChange = {this.onKeywordsChange.bind(this)}
          />
        </Header>

        <Body>
          <Tiles
            cities   = {cities}
            onDelete = {this.onCitytDelete.bind(this)}
          />
        </Body>

      </div>
    );
  }
}

function select(state) {
  return {
    cities:   state.cities,
    err:      state.err,
    cityList: state.cityList,
  };
}

export default connect(select)(App)
