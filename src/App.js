import React, { Component } from 'react';
import Tiles from './components/Tiles';
import { addCity } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  render() {
  const {dispatch, cities} = this.props;
  return (
    <div>
      <h1>Weather</h1>

      <Tiles
        cities = {cities} />

      <button
        onClick = {() => dispatch(addCity({name: "Perm", temperature: -1}))}
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