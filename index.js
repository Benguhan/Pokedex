const searchInput = document.getElementById('search-input');
const content = document.getElementById('content');

const pokemonCount = 151;
const pokeColors = {
    fire: "rgba(200, 100, 100, 0.7)",
    grass: "rgba(100, 200, 100, 0.7)",
    electric: "rgba(200, 200, 100, 0.7)",
    water: "rgba(100, 150, 200, 0.7)",
    ground: "rgba(200, 150, 100, 0.7)",
    rock: "rgba(150, 150, 150, 0.7)",
    fairy: "rgba(200, 150, 200, 0.7)",
    poison: "rgba(150, 100, 200, 0.7)",
    bug: "rgba(200, 150, 50, 0.7)",
    dragon: "rgba(100, 150, 200, 0.7)",
    psychic: "rgba(200, 200, 50, 0.7)",
    flying: "rgba(200, 200, 200, 0.7)",
    fighting: "rgba(150, 150, 150, 0.7)",
    normal: "rgba(200, 200, 200, 0.7)",
    ice: "rgba(150, 200, 200, 0.7)",
    ghost: "rgba(200, 100, 150, 0.7)"
};

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        createPokemon(data);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
};

const pokeFunc = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
};

const createPokemon = (pokemon) => {
    const pokeName = pokemon.name.toUpperCase();
    const id = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
    const color = pokeColors[type.toLowerCase()];
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
    const weight = pokemon.weight;
    const height = pokemon.height;

    const tempHTML = `
    <div class="cardBox">
        <div class="poke-name-img">
            <h4 class="poke-name" style="color:${color}">${pokeName}</h4>
            <img class="poke-img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${pokeName}">
        </div>
        <div class="poke-info">
            <p class="poke-id" style="color:${color}">#${id}</p>
            <p class="poke-type" style="color:${color}">Type : ${type}</p>
            <p class="poke-abilities" style="color:${color}">Abilities : ${abilities}</p>
            <div class="poke-weight-height">
                <p class="poke-weight" style="color:${color}">Weight : ${weight}</p>
                <p class="poke-height" style="color:${color}">Height : ${height}</p>
            </div>
        </div>

    </div>
    `;

    content.insertAdjacentHTML('beforeend', tempHTML);
};

pokeFunc();

const handleSearch = debounce(() => {
    const search = searchInput.value.toLowerCase();
    const pokeNames = document.querySelectorAll(".poke-name");

    pokeNames.forEach(element => {
        const parentElement = element.parentElement.parentElement;
        const pokemonName = element.innerHTML.toLowerCase();
        parentElement.style.display = pokemonName.includes(search) ? "flex" : "none";
    });
}, 300);

searchInput.addEventListener("input", handleSearch);