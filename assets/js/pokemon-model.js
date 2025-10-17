class Pokemon {
    constructor(pokemon) {
        this.id = pokemon.id;
        this.name = pokemon.name;
        this.types = pokemon.types;
        this.photo = pokemon.photo;
        this.type = this.types[0].type.name;
    }
}