// a root container component

import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { bindActionCreators } from 'redux';

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
  moveCity,
} from './actions';

import Tiles   from './components/tiles';
import AddCity from './components/add-city';
import Err     from './components/err';
import Header  from './components/header';
import Body    from './components/body';

import Button from './components/button';
import Logo from './components/logo';

import FloatingActionButton from './components/floating-action-button';

import { geoLocate } from './geolocation';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { windowWidth: 0 };
    this.calcTileWidth = this.calcTileWidth.bind(this);
    this.onCitySelected = this.onCitySelected.bind(this);
    this.onKeywordsChange = this.onKeywordsChange.bind(this);
    this.toggleAddingMode = this.toggleAddingMode.bind(this);
    this.toggleEditingMode = this.toggleEditingMode.bind(this);
  }
  
  componentDidMount() {
    this.calcTileWidth(this.props.cities.length);
    
    window.onresize = () => {
      this.calcTileWidth();
      setTimeout(this.calcTileWidth, 300);
    };

    if (!this.props.cities.length) {
      if (localStorage.cities) {
        // loading from the storage
        const cities = JSON.parse(localStorage.cities);
        cities.forEach(city => this.props.addCityById(city.id, city.name, city.temperature));
      } else {
        // init with the user's current location
        geoLocate(
          (lat, lng) => {
            this.props.addMyCity(lat, lng);
            this.props.addCity('Berlin');
            this.props.addCity('San Francisco');
            this.props.addCity('Sydney');
          }
        );
      }
    }

    setInterval(this.updateWeather.bind(this), 1800000);
  }
  
  componentWillUnmount() {
    window.onresize = () => {};
  }
  
  calcTileWidth() {
    const windowWidth = window.innerWidth;
    this.setState({ windowWidth });
  }

  saveCities(cities) {
    if (!cities) cities = [];
    localStorage.cities = JSON.stringify(cities);
  }

  updateWeather() {
    this.props.cities.forEach(city => this.props.addCityById(city.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err && nextProps.err.err) {
      setTimeout(() => this.props.resetError(), 3000);
    }
    if (this.props.cities !== nextProps.cities) {
      this.saveCities(nextProps.cities);
    }
  }

  onCitySelected(cityIndex) {
    let city = this.props.cityList[cityIndex];
    this.props.setCityList([]);
    this.props.addCityByLocation(city.Location.Lat, city.Location.Lng, city.Description);
  };

  onKeywordsChange(keywords) {
    if (!keywords || !keywords.length) return;

    geoLocate(
      (lat, lng) => {
        const location = `${lat},${lng}`;
        this.props.searchCity(keywords, location);
      }
    );
  }

  toggleAddingMode() {
    this.props.toggleAddingMode(this.props.mode);
  }

  toggleEditingMode() {
    this.props.toggleEditingMode(this.props.mode);
  }

  render() {
    const {
      cities,
      err,
      cityList,
      mode,
      moveCity,
      deleteCity,
    } = this.props;
    
    const { windowWidth } = this.state;

    const cityLen = cities.length;
    let tileWidth = windowWidth - 90;
    if (windowWidth > 800) {
      if (cityLen > 3) {
        tileWidth = ~~( (windowWidth-90) / Math.round(cityLen/2) );
      } else {
        tileWidth = (windowWidth-90) / cityLen;
      }
    }
    
    let suggestions = cityList.map(city => city.Description);

    let style = {
      fork: {
        right: 15,
        top: 15,
        position: 'absolute',
        display: windowWidth > 500 ? 'block' : 'none',
      },
      forka: {
        textDecoration: 'none',
        color: '#C8E6C9',
      },
      root: {
        color: '#212121',
        fontFamily: 'Roboto, Noto, sans-serif',
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
      },
    };

    return (
      <div style={style.root}>
        <FloatingActionButton
          onClick = {this.toggleAddingMode}
          mode = {mode === ADDING_MODE ? 'CANCEL' : 'NORMAL'}
        />

        <Err err = {err} />

        <Header>
          <Logo/>

          <div style={style.fork}>
            <a style={style.forka} href="https://github.com/mrsln/weather">fork it</a>
          </div>
          
        </Header>

        <Body>
          <Tiles
            cities     = {cities}
            onDelete   = {deleteCity}
            adding     = {mode === ADDING_MODE}
            editing    = {mode === EDITING_MODE}
            stopAdding = {this.toggleAddingMode}
            items      = {suggestions}
            onSelect   = {this.onCitySelected}
            onChange   = {this.onKeywordsChange}
            width      = {tileWidth}
            moveTile   = {moveCity}
          />
        </Body>

      </div>
    );
  }
}

export default connect(
  ({
    cities,
    err,
    cityList,
    mode,
  }) => ({
    cities,
    err,
    cityList,
    mode,
  }),
  {
    addCity,
    addCityById,
    addMyCity,
    setMode,
    setCityList,
    addCityByLocation,
    searchCity,
    deleteCity,
    toggleAddingMode,
    toggleEditingMode,
    resetError,
    moveCity,
  }
)(App);