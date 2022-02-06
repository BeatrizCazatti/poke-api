const elemSelect = document.getElementById("select-options");

elemSelect.addEventListener('change', function(event) {
    const value = event.target.value;
    value ? getValue(value) : setValues(value);
});

function getValue(value) {
    const service = new PokemonService();

    service.getPokemon(value).then(function(response) {
        const { name, height, base_experience, abilities, sprites, stats, weight } = response

        //0: hp
        //1: attack
        //2: defense
        //5: speed

        const pokemon = new Pokemon(
            name, height, experience = base_experience, abilities, sprites, stats, weight
        )

        setValues(pokemon);
    });
};

function setValues(pokemon) {
    const elemPokemonImage = document.getElementsByClassName('pokemon-image')[0],
        elemPokemonName = document.getElementsByClassName('pokemon-name')[0],
        elemPokemonExperience = document.getElementsByClassName('pokemon-experience')[0],
        elemPokemonAbilities = document.querySelector('.pokemon-abilities'),
        elemPokemonHeight = document.querySelector('.pokemon-height span'),
        elemPokemonWeight = document.querySelector('.pokemon-weight span');

    elemPokemonImage.style.backgroundImage = pokemon ? `url(${pokemon.image})` : 'url(https://via.placeholder.com/150x150)';
    elemPokemonName.innerHTML = pokemon ? pokemon.name : " --- ";
    elemPokemonExperience.innerHTML = pokemon ? pokemon.experience : "-";
    elemPokemonAbilities.innerHTML = pokemon ? pokemon.abilities : "-";
    elemPokemonHeight.innerHTML = pokemon ? pokemon.height : "-";
    elemPokemonWeight.innerHTML = pokemon ? pokemon.weight : "-";

    const elemPokemonAttack = document.querySelector('.pokemon-attack .number'),
        elemPokemonDefense = document.querySelector('.pokemon-defense .number'),
        elemPokemonSpeed = document.querySelector('.pokemon-speed .number'),
        elemPokemonAttackBar = document.querySelector('.pokemon-attack .bar-color'),
        elemPokemonDefenseBar = document.querySelector('.pokemon-defense .bar-color'),
        elemPokemonSpeedBar = document.querySelector('.pokemon-speed .bar-color');


    if (pokemon) {
        var base_stat = {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
        }
    }
    elemPokemonAttack.innerHTML = pokemon ? base_stat.attack : "-"
    elemPokemonDefense.innerHTML = pokemon ? base_stat.defense : "-"
    elemPokemonSpeed.innerHTML = pokemon ? base_stat.speed : "-"

    elemPokemonAttackBar.style.width = pokemon ? `${base_stat.attack}px` : "0"
    elemPokemonDefenseBar.style.width = pokemon ? `${base_stat.defense}px` : "0"
    elemPokemonSpeedBar.style.width = pokemon ? `${base_stat.speed}px` : "0"
};

function rendeOptions() {
    const service = new PokemonService;

    service.getTypes().then(function(response) {
        const { results } = response;
        rende(results);
    });
};
rendeOptions();


function rende(types) {
    types.map(type => {
        const liType = `
        <li class="list-types-item" onclick="typeSelect('${type.name}')">
            ${type.name.charAt(0).toUpperCase()}${type.name.slice(1)}
        </li>
        `;

        const listTypes = document.querySelectorAll('.list-types')[0];
        listTypes.innerHTML = listTypes.innerHTML + liType;
    })
}

function typeSelect(type) {
    const service = new PokemonService;
    clearOptions(type);

    const element = document.getElementsByTagName('li');
    //console.log(type)
    for (let n = 0; n < 18; n++) {
        if (element[n].innerText == `${type.charAt(0).toUpperCase()}${type.slice(1)}`) {
            element[n].style.background = 'var(--color-2)'
            element[n].style.color = 'var(--color-4)'
        }
    }

    //arrow function, equivalente:  //response => {}
    service.getPokemonNames(type).then(function(response) {
        const { pokemon } = response;

        setOptions(pokemon);
    });
};

function setOptions(options) {
    options.map(option => {
        const pokemon = new Pokemon(option.pokemon.name)

        elemSelect.add(new Option(pokemon.name, option.pokemon.name), null)
    });
};

function clearOptions(type) {
    while (elemSelect.length != 0) {
        elemSelect.remove(Option);
    };
    for (let n = 0; n < 18; n++) {
        document.getElementsByClassName('list-types-item')[n].style.background = "var(--color-4)"
        document.getElementsByClassName('list-types-item')[n].style.color = "var(--color-2)"
    }
    elemSelect.add(new Option(`-- ${type} --`, ''));
};