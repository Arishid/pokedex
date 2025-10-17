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
                    <img src="${pokemon.photo}" alt="${pokemon.name}"/>
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
        <div id="sobre" class="ModalTitulo">
            <div class='pokemon'>
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.photo}" alt="${pokemon.name}"/>
            </div>
        </div>

        <div class="TabControl">
            <div id="header">
                <ul class="abas">
                    <li>
                        <div class="aba" id="tabAbout">
                            <span>Sobre</span>
                        </div>
                    </li>
                    <li>
                        <div class="aba" id="tabAbility">
                            <span>Abilidades</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="contentAbility"></div>
        </div>
    `;

    document.getElementById('tabAbout').addEventListener('click', () => inserirConteudo(pokemon, 'contentAbout'));
    document.getElementById('tabAbility').addEventListener('click', () => inserirConteudo(pokemon, 'contentAbility'));

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

function inserirConteudo(pokemon, aba) {
    const conteudo = document.getElementById('contentAbility');
     if (aba === 'contentAbout') {
         selecionado = document.getElementById('tabAbout');
         selecionado.style.textDecoration = 'underline';    

         document.getElementById('tabAbility').style.textDecoration = 'none';
        conteudo.innerHTML = `
            <div id="Sobre" class="ModalDescricao">
                Mais detalhes em breve
            </div>
        `;
     }
    else if (aba === 'contentAbility') {
         selecionado = document.getElementById('tabAbility');
         selecionado.style.textDecoration = 'underline';    

         document.getElementById('tabAbout').style.textDecoration = 'none';
        conteudo.innerHTML = `
            <div id="Abilidades" class="ModalDescricao">
                ${pokemon.abilities.map((abilidades) => `<li>${abilidades.ability.name}</li>`).join('')}
            </div>
        `;
    }else{
        conteudo.innerHTML = ``;
    }
    
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