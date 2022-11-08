import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import PeoplePage from '../people-page';


import './app.css';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  componentDidCatch(){
    this.setState({hasError: true});
  }


  render() {

    if(this.state.hasError){
      return <ErrorIndicator/>
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;


    return (
      <div>
        <Header />
        { planet }

        <div className='btns-panel'>
          <button 
            className='btns-panel_item btn btn-warning btn-lg'
            onClick={this.toggleRandomPlanet}>
            Toggle random planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage />
      </div>
    );
  }
};

