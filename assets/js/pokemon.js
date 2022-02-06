class Pokemon {
    constructor(name, height, experience, abilities, image, stats, weight) {
        this._name = name;
        this._height = height;
        this._experience = experience;
        this._abilities = abilities;
        this._sprites = image;
        this._stats = stats;
        this._weight = weight;
    };

    get name() {
        return this._capitalize(this._name);
    };

    get height() {
        return `${this._height}m`;
    };

    get experience() {
        return `${this._experience}hp`;
    };

    get abilities() {
        return this._abilitiesFormat(this._abilities);
    };
    
    get image() {
        return this._sprites.front_default;
        //return this._sprites.other.home.front_default;
    };

    get stats() {
        return this._stats;
        //0: hp
        //1: attack
        //2: defense
        //5: speed

    };

    get weight() {
        return `${this._weight}kg`;
    };

    _capitalize (value){
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }

    _abilitiesFormat (abilities){
        return abilities.map(item => ` ${item.ability.name}`);
    }
}