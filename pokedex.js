let allPokemon = [];
let currentPokemon;
let pokemonLimit = 16; // 16 Pokémon before scrolling and overall there are 898 Pokémon from all Pokémon-parts
let isLoading = false;

async function loadPokemon() { // shows the content from API
    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);

        renderPokemonInfo(i);
    }
    window.addEventListener('scroll', ScrollAllPokemon);
}


function renderPokemonInfo(i) { // shows the content by loading the page
let content = document.getElementById('allCards');
content.innerHTML += showLittleCard(i);

showLittleCardInfo(i);
}


const ScrollAllPokemon = async () => { // For showing another 16 Pokémon by scrolling
    if (!isLoading && (window.scrollY + window.innerHeight >= document.body.clientHeight)) { // checks if page is loading and calculates height from window and information and body
        for (let i = pokemonLimit; i < pokemonLimit + 16; i++) {
            isLoading = true;
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            renderPokemonInfo(i);
        }
        pokemonLimit += 16; // add another 16 Pokémon
        isLoading = false;
    }
}


function showLittleCardInfo(i) { // front view from little card
    showName(i);
    showNumber(i);
    showImage(i);
    showType(i);
}


function showName(i) { // Information from the API
    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
}


function showNumber(i) { // Information from the API
    document.getElementById(`pokemonNumber${i}`).innerHTML = currentPokemon['id'];
}


function showImage(i) { // Information from the API
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['home']['front_default'];
}


function showType(i) {  // Information from the API
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        document.getElementById(`pokemonTypes1${i}`).innerHTML += `<p>${type}</p>`;
    }
}


async function loadBigPokemonCards(i) { // Loading the big card with infos
    let info = document.getElementById(`bigCard${i}`);
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    info.innerHTML = '';
    info.innerHTML += showBigCard(i), showBigCardInfo(i), changeProgressBarColor();
}


function showBigCardInfo(i) { // showing big card with infos
    showBigName(i);
    showBigNumber(i);
    showBigType(i);
    showHeight(i);
    showWeight(i);
    showBigImage(i);
    loadPokeStats(i);
}


function showBigName(i) { // Information from the API
    document.getElementById(`pokemonBigName${i}`).innerHTML = currentPokemon['name'];
}


function showBigNumber(i) { // Information from the API
    document.getElementById(`pokemonBigNumber${i}`).innerHTML = currentPokemon['id'];
}


function showBigType(i) { // Information from the API
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>${type}</p>`;
    }
}


function showHeight(i) { // Information from the API
    let height = currentPokemon['height'];
    document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>Height: ${height}</p>`;
}


function showWeight(i) { // Information from the API
    let weight = currentPokemon['weight'];
    document.getElementById(`pokemonBigTypes1${i}`).innerHTML += `<p>Weight: ${weight}</p>`;
}


function showBigImage(i) { // Information from the API
    document.getElementById(`pokemonBigImage${i}`).src = currentPokemon['sprites']['other']['home']['front_default'];
}


function loadPokeStats(i) { // Information from the API
    let content = document.getElementById(`info-container${i}`);
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let stat = currentPokemon['stats'][i]['base_stat'];
        let statName = currentPokemon['stats'][i]['stat']['name'];
        content.innerHTML += showStats(i, stat, statName);
    }
}


function openBigCard(i) {
    document.getElementById('showBigCard').classList.remove('d-none');
    document.getElementById('body').classList.add('noScroll');
    document.getElementById('search').classList.add('d-none');
    document.getElementById('heading').classList.add('d-none');
    document.getElementById('showBigCard').innerHTML += showBigCard(i);
    document.getElementById('showBigCard').style = 'z-index: 2';
    loadBigPokemonCards(i);
}


function closeBigCard(i) {
    document.getElementById('showBigCard').classList.add('d-none');
    document.getElementById(`bigCard${i}`).classList.add('d-none');
    document.getElementById('body').classList.remove('noScroll');
    document.getElementById('search').classList.remove('d-none');
    document.getElementById('heading').classList.remove('d-none');
    document.getElementsByClassName('big-card').style = 'z-index: -1';
    document.getElementById('showBigCard').style = 'z-index: -1';
    document.getElementById('showBigCard').innerHTML = '';
}


function searchPokemon() { // for searching a specific Pokémon
    let search = document.getElementById('search').value; 
    search = search.toLowerCase();
    let content = document.getElementById('allCards');
    content.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        let name = allPokemon[i]['name'];
        if (name.toLowerCase().includes(search)) {
            currentPokemon = allPokemon[i];
            renderPokemonInfo(i + 1);
        }
    }
}


function changeProgressBarColor() { // Over stat 100 is stats-bar color changing from greenyellow to orangered
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let stat = currentPokemon['stats'][i]['base_stat'];
        if (stat > 100) {
            document.getElementById(`processBarValue${i}`).style = 'background-color:  #ff4500';
        }
    }
}
