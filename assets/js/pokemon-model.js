class Pokemon {
    debugger;
    constructor(pokemon) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.types = pokemon.types;
        this.photo = pokemon.sprites.front_default;
        this.type = this.types[0].type.name;
        this.abilities = pokemon.abilities;
    }
}