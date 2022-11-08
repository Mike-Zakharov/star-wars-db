import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service.js';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null
  };


  componentDidMount(){
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }


  updatePerson() {
    const { personId } = this.props;
    if(!personId) {
      return;
    }

    this.swapiService.getPerson(personId)
    .then((person) => {
      this.setState({ person })
    });
  };



  render() {

    if(!this.state.person) {
      return <Spinner />
    }
    // в используемом API не всегда есть необходимы данные :(
    const { id, name, gender, height, birthYear, eyeColor, hairColor } = this.state.person;
    console.log(this.state.person);

    return (
      <div className="person-details card">
        <img className="person-image" alt='img person'
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-descr">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{ gender }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Height</span>
              <span>{ height + 'cm' }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{ birthYear }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{ eyeColor }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Hair Color</span>
              <span>{ hairColor }</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}