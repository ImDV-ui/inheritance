import Move from '../classes/Move.js';
import Pokemon from '../classes/Pokemon.js';

export default class PokeAPI {

    static async getPokemon(id, level = 50) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("API Fetch failed");
        const data = await res.json();


        const types = data.types.map(t => t.type.name);


        const baseStats = {};
        data.stats.forEach(st => {
            const name = st.stat.name;
            if (['hp', 'attack', 'defense', 'speed'].includes(name)) {
                baseStats[name] = st.base_stat;
            }
        });


        const primaryType = types[0];
        let availableMoves = [...(this.moveDictionary[primaryType] || []), ...(this.moveDictionary['normal'])];
        availableMoves.sort(() => 0.5 - Math.random());
        
        const moves = [];
        for (let i = 0; i < 4; i++) {
            if (availableMoves[i]) {
                const md = availableMoves[i];
                let mType = primaryType;
                const typeMoves = this.moveDictionary[primaryType];
                if (!typeMoves || !typeMoves.find(m => m.name === md.name)) {
                    mType = 'normal';
                }
                moves.push(new Move({
                    name: md.name, type: mType, power: md.power, accuracy: md.accuracy, pp: md.pp
                }));
            }
        }


        const spriteFront = data.sprites.front_default;
        const spriteBack = data.sprites.back_default || data.sprites.front_default;

        return new Pokemon({
            name: data.name,
            level: level,
            types: types,
            baseStats: baseStats,
            moves: moves,
            spriteFront: spriteFront,
            spriteBack: spriteBack
        });
    }
}
