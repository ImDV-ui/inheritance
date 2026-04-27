import PokeAPI from './api/PokeAPI.js';
import GameController from './game/GameController.js';

document.addEventListener('DOMContentLoaded', async () => {
    const logElem = document.getElementById('log-text');
    const actBox = document.getElementById('action-box');
    
    logElem.innerText = "Conectando con la Dex de Kanto (PokeAPI)...";
    
    const pId = Math.floor(Math.random() * 151) + 1;
    let eId = Math.floor(Math.random() * 151) + 1;
    if (eId === pId) eId = (eId % 151) + 1;

    try {
        logElem.innerText = `Descargando información en paralelo de IDs ${pId} y ${eId}...`;
        
        const [playerPokemon, enemyPokemon] = await Promise.all([
            PokeAPI.getPokemon(pId, 50),
            PokeAPI.getPokemon(eId, 50)
        ]);

        new GameController(playerPokemon, enemyPokemon);

    } catch (e) {
        logElem.innerText = "Hubo un error cargando los datos de la PokéAPI. Revisa la consola.";
        console.error(e);
    }
});