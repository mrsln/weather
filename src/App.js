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

  onCitySelected(e, city) {
    this.props.dispatch(setCityList([]));
    this.props.dispatch(addCity(city.name + ', ' + city.country));
  }

  onKeywordsChange(e, keywords) {
    this.props.dispatch(searchCity(keywords));
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
