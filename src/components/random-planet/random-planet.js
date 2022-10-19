import React, { Component } from 'react';

import './random-planet.css';

import SwapiService from '../../services/swapi-service.js';

import Spinner from '../spinner';

import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  constructor(){
    super();
    this.updatePlanet();
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  updatePlanet() {
    // Рандомайзер id для вывщда рандомной планеты
    let id = Math.floor(Math.random() * 19) + 1;
    
    
    // Создаём пропуск 20й планеты,потому что данные о ней пусты
    if(id === 20){
      ++id;
    }

    this.swapiService.getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError);
  }

  render() {

    const { planet: {id, name, population, rotationPeriod, diameter}, loading, error} = this.state; 
    
    // Error
    if(error){
      return <ErrorIndicator />
    }

    // Spinner
    if(loading){
      return <Spinner />
    }

    // Создаём проверку src потому что на сервере нет изображения татуина, сам в шоке :)
    let srcPlanet = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    if(srcPlanet === `https://starwars-visualguide.com/assets/img/planets/1.jpg`){
       srcPlanet = "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg"
    }
    

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image" src={srcPlanet} alt='planet img' />
        <div className='planet-descr'>
          <h4 className='planet-name'>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
