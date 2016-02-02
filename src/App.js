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
  setMode,
  toggleAddingMode,
  DEFAULT_MODE,
  ADDING_MODE,
  EDITING_MODE,
  toggleEditingMode,
} from './actions';

import Tiles   from './components/tiles';
import AddCity from './components/add-city';
import Err     from './components/err';
import Header  from './components/header';
import Body    from './components/body';

import Button from './components/button';
import Logo from './components/logo';

class App extends Component {

  constructor(props) {
    super(props);
  }
  
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

  onCitySelected = (cityIndex) => {
    this.props.dispatch(setMode(DEFAULT_MODE));
    let city = this.props.cityList[cityIndex];
    this.props.dispatch(setCityList([]));
    this.props.dispatch(addCityByLocation(city.Location.Lat, city.Location.Lng, city.Description));
  }

  onKeywordsChange = (keywords) => {
    if (!keywords || !keywords.length) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        const location = position.coords.latitude + ',' + position.coords.longitude;
        this.props.dispatch(searchCity(keywords, location));
      }
    );
  }

  onCitytDelete = (i) => {
    this.props.dispatch(deleteCity(i));
  }

  toggleAddingMode = () => {
    this.props.dispatch(toggleAddingMode(this.props.mode));
  }

  toggleEditingMode = () => {
    this.props.dispatch(toggleEditingMode(this.props.mode))
  }

  render() {
    const {dispatch, cities, err, cityList} = this.props;
    
    let suggestions = cityList.map(city => city.Description);

    return (
      <div>
        <Err err = {err} />

        <Header>
          <Logo/>
          
          <Button
            onClick = {this.toggleAddingMode}
          >
            {this.props.mode === ADDING_MODE ? 'Done' : 'Add'}
          </Button>
          <Button
            onClick = {this.toggleEditingMode}
          >
            {this.props.mode === EDITING_MODE ? 'Done' : 'Delete'}
          </Button>
        </Header>

        <Body>
          <Tiles
            cities     = {cities}
            onDelete   = {this.onCitytDelete}
            adding     = {this.props.mode === ADDING_MODE}
            editing    = {this.props.mode === EDITING_MODE}
            stopAdding = {this.toggleAddingMode}
            items      = {suggestions}
            onSelect   = {this.onCitySelected}
            onChange   = {this.onKeywordsChange}
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
    mode:     state.mode,
  };
}

export default connect(select)(App)
