import ElectricPokemon from './classes/types/ElectricPokemon.js';
import FirePokemon from './classes/types/FirePokemon.js';
import BattleManager from './game/BattleManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciar un Pokémon elécrito de nivel 5 (TrainedPokemon)
    const pikachu = new ElectricPokemon("Pikachu", 5, 35, 20);
    
    // 2. Instanciar un Pokémon de fuego de nivel 5 salvaje enemigo (WildPokemon)
    const charmander = new FirePokemon("Charmander", 5, 39, 10);
    
    // 3. Iniciar el BattleManager para conectar todo el DOM
    const battle = new BattleManager(pikachu, charmander);
});
