import ElectricPokemon from './classes/types/ElectricPokemon.js';
import FirePokemon from './classes/types/FirePokemon.js';
import BattleManager from './game/BattleManager.js';

document.addEventListener('DOMContentLoaded', () => {

    const pikachu = new ElectricPokemon("Pikachu", 5, 35, 20);
    

    const charmander = new FirePokemon("Charmander", 5, 39, 10);
    

    const battle = new BattleManager(pikachu, charmander);
});
