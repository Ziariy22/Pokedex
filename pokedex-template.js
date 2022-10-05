// Templates

function showLittleCard(i) { // showing the front card
    let type = currentPokemon['types']['0']['type']['name'];
    return `<div id="card${i}" class="card ${type}" onclick="openBigCard(${i})">
                <div class="card-name">
                    <h2 id="pokemonName${i}"></h2>
                    <h2 id="pokemonNumber${i}"></h2>
                </div>
                <div class="card-image">
                    <img id="pokemonImage${i}">
                </div>
                <div id="pokemonTypes1${i}" class="card-types">
                </div>
            </div>`;
}


function showStats(i, stat, statName) { // Stats of the Pokémon
    return `<div class="info-container-name">
                <p>${statName}</p>
                <div class="stats-border">
                    <div id="processBarValue${i}" class="stats-bar" style="width: ${stat}%"><p>${stat}</p></div>
                    </div>
            </div>`;
}


function showBigCard(i) { // showing the big card by opening
    let type = currentPokemon['types']['0']['type']['name'];
    return `
        <div id="bigCard${i}" class="big-card ${type}">
            <div class="big-card-header">
                <h2 id="pokemonBigName${i}"></h2>
                <div class="closeButton">
                    <img onclick="closeBigCard(${i})" src="img/close-button.png" >
                    </div>
                </div>
            <div class="big-card-info">
                <div id="pokemonBigTypes1${i}" class="big-card-info-content">
                    <p id="pokemonBigNumber${i}"></p>
                </div>
                <div class="big-card-info-image">
                    <img id="pokemonBigImage${i}">
                </div>
                </div>
            <div id="info-container${i}" class="info-container">
            </div>
        </div>`
}