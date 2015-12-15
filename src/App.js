import React, { Component } from 'react';
import Tiles from './components/Tiles';
import { addCity } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  
  componentDidMount() {
    if (!this.props.cities.length) {
      if (localStorage.cities) {
        localStorage.cities.split(',').forEach(city => this.props.dispatch(addCity(city)));
      } else {
        this.props.dispatch(addCity('Perm'));
      }
    }

    window.addEventListener('beforeunload', () => {
      localStorage.cities = this.props.cities.map(city => city.name);
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