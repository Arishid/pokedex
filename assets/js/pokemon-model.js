class Pokemon {
    debugger;
    constructor(pokemon) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.types = pokemon.types;
        this.photo = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, 0)}.png`;
        this.type = this.types[0].type.name;
        this.abilities = pokemon.abilities;
    }
}