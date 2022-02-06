class PokemonService {
    constructor() {
        this._baseUrl = 'https://pokeapi.co/api/v2/';
    };

    getPokemon(name) {
        return fetch(`${this._baseUrl}pokemon/${name}`)
        .then(response => response.json())
        .then(data => data);
    };
    
    getTypes(){
        return fetch(`${this._baseUrl}type?limit=18`)
        .then(response => response.json())
        .then(data => data);
    }

    getPokemonNames(type) {
        return fetch(`${this._baseUrl}type/${type}`)
        .then(response => response.json())
        .then(data => data);
    }
}