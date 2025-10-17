const pokemonList = document.getElementById('pokemonList');
const carregarMaisButton = document.getElementById('carregarMais');

let offset = 0;
let limit = 5;

const maxRecords = 151999;

function convertPokemonToLi(pokemon, index, array) {
    const numero = String(pokemon.id).padStart(3, 0);
    return `
        <li id = "${pokemon.id}" class="pokemon ${pokemon.type}">
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

pokemonList.addEventListener('click', (event) => {
    const li = event.target.closest('li.pokemon');
    if (!li) return;
    console.log(li.id);
    openPokemonModal(li.id);
});

function openPokemonModal(id) {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'flex';  
    pokeApi.getPokemonById(id).then((pokemon) => preencherModalById(pokemon, modal));
}

function preencherModalById(pokemon, modal) {
    const modalBody = document.getElementById('modalBody');
    modalBody.className = pokemon.type;
    modalBody.innerHTML = `
        <div id="sobre">
            <h2>Pokémon ID: ${pokemon.id}</h2>
            <p>Mais detalhes em breve...</p>
           
        </div>
        <div id="Abilidades">
                ${pokemon.abilities.map((abilidades) => `<h3>${abilidades.ability.name}</h3>`).join('')}
        </div>
        <button id="closeBtn" class="fechar">Fechar</button>
    `;
    document.getElementById('closeBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('pokemonModal').style.display = 'none';
});

// Fecha ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemonModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});