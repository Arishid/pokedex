const pokemonList = document.getElementById('pokemonList');
const carregarMaisButton = document.getElementById('carregarMais');
let offset = 0;
let limit = 5;

const maxRecords = 151999;

function convertPokemonToLi(pokemon, index, array) {
    const numero = String(pokemon.id).padStart(3, 0);
    return `
        <li class="pokemon ${pokemon.type}">
                <span class="numero">#${numero}</span>
                <span class="titulo">${pokemon.name}</span>
                <div class="detalhe">
                    <ol class="tipos">
                        ${pokemon.types.map((types) => `<li class="tipo ${pokemon.type}">${types.type.name}</li>`).join('')}
                    </ol>
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numero}.png" alt="${pokemon.name}"/>
                </div> 
            </li>
   `
}

function carregarMais() {
    if(offset >= maxRecords) {
        carregarMaisButton.parentElement.removeChild(carregarMaisButton);
    }
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(''));
    offset += limit;
    
}   
carregarMais();
carregarMaisButton.addEventListener('click', () => carregarMais());