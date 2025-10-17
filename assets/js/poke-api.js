const pokeApi = {}


pokeApi.getPokemonDetail = (pokemons) => {
    const url = pokemons.url;
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => new Pokemon(pokemon))
        .catch((error) => console.log(error))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    return fetch(url)
        .then((response) => response.json())
        .then((responseBody) => responseBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))    
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}

pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => new Pokemon(pokemon))
        .catch((error) => console.log(error))
}
