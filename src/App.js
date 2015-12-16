import React, { Component } from 'react';
import { connect }          from 'react-redux';

import { addCity, addCityByLocation, addCityById } from './actions';

import Tiles from './components/Tiles';

class App extends Component {
  
  componentDidMount() {
    if (!this.props.cities.length) {
      if (localStorage.cities) {
        localStorage.cities.split(',').forEach(cityId => this.props.dispatch(addCityById(cityId)));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.props.dispatch(addCityByLocation(position.coords.latitude, position.coords.longitude));
          }
        );
      }
    }

    window.addEventListener('beforeunload', () => {
      localStorage.cities = this.props.cities.map(city => city.id);
    });
  }

  render() {
    const {dispatch, cities} = this.props;
    return (
      <div>
        <h1>Weather</h1>

        <Tiles
          cities = {cities} />

        <button
          onClick = {() => dispatch(addCity('Moscow'))}
        >+</button>
      </div>
    );
  }
}

function select(state) {
  return {
    cities: state.cities
  };
}

export default connect(select)(App)