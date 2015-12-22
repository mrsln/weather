// a root container component

import React, { Component } from 'react';
import { connect }          from 'react-redux';

import { addCity, addCityByLocation, addCityById, searchCity, resetError } from './actions';

import Tiles   from './components/Tiles';
import AddCity from './components/AddCity';
import Err     from './components/Err';

class App extends Component {
  
  componentDidMount() {
    if (!this.props.cities.length) {

      if (localStorage.cities) {
        // loading from the storage
        localStorage.cities.split(',').forEach(cityId => this.props.dispatch(addCityById(cityId)));
      } else {
        // init with the user's current location
        navigator.geolocation.getCurrentPosition(
          position =>
            this.props.dispatch(addCityByLocation(position.coords.latitude, position.coords.longitude))
        );
      }
    }

    // saving user's city to the storage before closing the app
    window.addEventListener('beforeunload', () => {
      localStorage.cities = this.props.cities.map(city => city.id);
    });

    setTimeout(this.updateWeather.bind(this), 3600);
  }

  updateWeather() {
    this.props.cities.forEach(city => this.props.dispatch(addCityById(city.id)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err && nextProps.err.err) {
      setTimeout(() => this.props.dispatch(resetError()), 3000);
    }
  }

  selectAndSearch_(e) {
    const cityName = e.value;
    this.props.dispatch(addCity(cityName));
  }

  onKeywordsChange(e, keywords) {
    this.props.dispatch(searchCity(keywords));
  }

  render() {
    const {dispatch, cities, err, cityList} = this.props;
    return (
      <div>
        <h1>Weather</h1>
        
        <Err     err    = {err}    />
        <Tiles   cities = {cities} />
        
        <AddCity
          cityList      = {cityList}
          onInputSelect = {this.selectAndSearch_.bind(this)}
          onInputChange = {this.onKeywordsChange.bind(this)}
        />

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
