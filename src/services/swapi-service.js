
export default class SwapiService {

    _apiBase = 'https://swapi.dev/api'

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok){
            throw new Error (`Could not fetch ${this._apiBase}${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    async getAllPeople() {
        // Устраиваем танцы с бубном что бы получить известных персонажей в определённом порядке
        // т.к. API по порядку отдаёт список(из 10 персонажей) который мне не нравится.
        //  + контролим количество персонажей в списке.
        // Для получения простого списка : 
        // const res = await this.getResource(`/people/`)
        // return res.results.map(this._transformPerson);
        const peopleArr = [
            await this.getResource(`/people/11`),
            await this.getResource(`/people/4`),
            await this.getResource(`/people/5`),
            await this.getResource(`/people/1`),
            await this.getResource(`/people/10`),
            await this.getResource(`/people/20`),
            await this.getResource(`/people/14`),
            await this.getResource(`/people/13`),
            await this.getResource(`/people/2`),
            await this.getResource(`/people/3`),
            ] 
        const res = peopleArr.map(this._transformPerson)  
        return res;
    };

    async getPerson(id){
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    };

    async getAllPlanets(){
        const res = await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet);
    };

    async getPlanet(id){
        const planet = await this.getResource(`/planets/${id}`)
        return this._transformPlanet(planet);
    };

    async getAllStarships(){
        const res = await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship);
    };

    async getStarship(id){
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    };

    // Получаем id 
    _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    // трансформируем данные с сервера

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person) ,
            name: person.name,
            gender: person.gender,
            height: person.height,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
            hairColor: person.hair_color
        }
    };
}