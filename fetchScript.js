const pokeApiBase = 'https://pokeapi.co/api/v2/pokemon'
const form = document.getElementById("pokemon-search");

function populatePokemonDiv(data) {
    const {types, forms, abilites, sprites} = data;
    const pokemonName = forms[0].name;
    const typesString = types.reduce((inital, next) => {
            return inital += `${next["type"]["name"]} `
    }, "")
    const {front_default: pictureUrl} = sprites;
    console.log(data);
    document.getElementById('main-section').innerHTML = `
        <div class='card'>
            <img src=${pictureUrl} class="card-img-top" alt=${pokemonName}>
            <h5 class='card-title'>${pokemonName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Type: ${typesString}</h6>
        </div>
    `
}

function errorCleanUp(error) {
    console.error(error.message);
    document.getElementById('main-section').innerHTML = `<p id='error-message' style="color:red">Something went wrong</p>`
    document.getElementById('search-bar').value = "";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let {value} = document.getElementById("search-bar");
    fetch(`${pokeApiBase}/${value.toLowerCase()}`)
        .then(response => response.json())
        .then(populatePokemonDiv)
        .catch(errorCleanUp);
    value = ""
})