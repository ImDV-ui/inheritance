import PokeAPI from './js/api/PokeAPI.js';
import BattleManager from './js/game/BattleManager.js';

console.log("Imports successful");

try {
    const [p1, p2] = await Promise.all([
        PokeAPI.getPokemon(1, 50),
        PokeAPI.getPokemon(4, 50)
    ]);
    console.log("Pokemon 1:", p1.name);
    console.log("Pokemon 2:", p2.name);
} catch (e) {
    console.error("Error during fetch or instantiating:", e);
}
