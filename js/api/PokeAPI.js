import Move from '../classes/Move.js';
import Pokemon from '../classes/Pokemon.js';

export default class PokeAPI {

    static moveDictionary = {
        normal: [{name: 'Placaje', power: 40, accuracy: 100, pp: 35}, {name: 'Arañazo', power: 40, accuracy: 100, pp: 35}, {name: 'Golpe Cuerpo', power: 85, accuracy: 100, pp: 15}, {name: 'Doble Filo', power: 120, accuracy: 100, pp: 15}],
        fire: [{name: 'Ascuas', power: 40, accuracy: 100, pp: 25}, {name: 'Lanzallamas', power: 90, accuracy: 100, pp: 15}, {name: 'Llamarada', power: 110, accuracy: 85, pp: 5}],
        water: [{name: 'Pistola Agua', power: 40, accuracy: 100, pp: 25}, {name: 'Burbuja', power: 40, accuracy: 100, pp: 30}, {name: 'Surf', power: 90, accuracy: 100, pp: 15}, {name: 'Hidrobomba', power: 110, accuracy: 80, pp: 5}],
        grass: [{name: 'Látigo Cepa', power: 45, accuracy: 100, pp: 25}, {name: 'Hoja Afilada', power: 55, accuracy: 95, pp: 25}, {name: 'Rayo Solar', power: 120, accuracy: 100, pp: 10}],
        electric: [{name: 'Impactrueno', power: 40, accuracy: 100, pp: 30}, {name: 'Rayo', power: 90, accuracy: 100, pp: 15}, {name: 'Trueno', power: 110, accuracy: 70, pp: 10}],
        psychic: [{name: 'Confusión', power: 50, accuracy: 100, pp: 25}, {name: 'Psíquico', power: 90, accuracy: 100, pp: 10}],
        fighting: [{name: 'Golpe Kárate', power: 50, accuracy: 100, pp: 25}, {name: 'Tajo Cruzado', power: 80, accuracy: 80, pp: 20}],
        ground: [{name: 'Excavar', power: 80, accuracy: 100, pp: 10}, {name: 'Terremoto', power: 100, accuracy: 100, pp: 10}],
        rock: [{name: 'Lanzarrocas', power: 50, accuracy: 90, pp: 15}, {name: 'Avalancha', power: 75, accuracy: 90, pp: 10}],
        flying: [{name: 'Picotazo', power: 35, accuracy: 100, pp: 35}, {name: 'Golpe Aéreo', power: 60, accuracy: 100, pp: 20}],
        bug: [{name: 'Chupavidas', power: 80, accuracy: 100, pp: 10}, {name: 'Pin Misil', power: 25, accuracy: 95, pp: 20}],
        poison: [{name: 'Picotazo Veneno', power: 15, accuracy: 100, pp: 35}, {name: 'Bomba Lodo', power: 90, accuracy: 100, pp: 10}],
        ice: [{name: 'Rayo Hielo', power: 90, accuracy: 100, pp: 10}, {name: 'Ventisca', power: 110, accuracy: 70, pp: 5}],
        ghost: [{name: 'Tinieblas', power: 0, accuracy: 100, pp: 15}, {name: 'Bola Sombra', power: 80, accuracy: 100, pp: 15}],
        dragon: [{name: 'Ciclón', power: 40, accuracy: 100, pp: 20}, {name: 'Garra Dragón', power: 80, accuracy: 100, pp: 15}]
    };

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
                if (!this.moveDictionary[primaryType]?.find(m => m.name === md.name)) {
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
