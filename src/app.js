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
    this.state = {windowWidth: 0};
    this.calcTileWidth = this.calcTileWidth.bind(this);
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
          (lat, lng) => this.props.addMyCity(lat, lng)
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

  onCitySelected = (cityIndex) => {
    this.props.setMode(DEFAULT_MODE);
    let city = this.props.cityList[cityIndex];
    this.props.setCityList([]);
    this.props.addCityByLocation(city.Location.Lat, city.Location.Lng, city.Description);
  };

  onKeywordsChange = (keywords) => {
    if (!keywords || !keywords.length) return;

    geoLocate(
      (lat, lng) => {
        const location = `${lat},${lng}`;
        this.props.searchCity(keywords, location);
      }
    );
  }

  onCitytDelete = (i) => {
    this.props.deleteCity(i);
  }

  toggleAddingMode = () => {
    this.props.toggleAddingMode(this.props.mode);
  }

  toggleEditingMode = () => {
    this.props.toggleEditingMode(this.props.mode);
  }

  render() {
    const {
      cities,
      err,
      cityList,
      mode,
    } = this.props;
    
    let tileWidth = 200;
    const cityLen = cities.length + ~~(mode === ADDING_MODE);
    if (cityLen > 3) {
      tileWidth = ~~(this.state.windowWidth / (cityLen/2))-150;
    }
    
    let suggestions = cityList.map(city => city.Description);

    let style = {
      fork: {
        right: 15,
        top: 15,
        position: 'absolute',
        display: this.state.windowWidth > 500 ? 'block' : 'none',
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
            onDelete   = {this.onCitytDelete}
            adding     = {mode === ADDING_MODE}
            editing    = {mode === EDITING_MODE}
            stopAdding = {this.toggleAddingMode}
            items      = {suggestions}
            onSelect   = {this.onCitySelected}
            onChange   = {this.onKeywordsChange}
            width      = {tileWidth}
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
  (dispatch) => ({
    addCityById: bindActionCreators(addCityById, dispatch),
    addMyCity: bindActionCreators(addMyCity, dispatch),
    setMode: bindActionCreators(setMode, dispatch),
    setCityList: bindActionCreators(setCityList, dispatch),
    addCityByLocation: bindActionCreators(addCityByLocation, dispatch),
    searchCity: bindActionCreators(searchCity, dispatch),
    deleteCity: bindActionCreators(deleteCity, dispatch),
    toggleAddingMode: bindActionCreators(toggleAddingMode, dispatch),
    toggleEditingMode: bindActionCreators(toggleEditingMode, dispatch),
  })
)(App);