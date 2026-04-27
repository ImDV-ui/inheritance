import TypeChart from '../game/TypeChart.js';
import Entity from './Entity.js';

export default class Pokemon extends Entity {
    constructor({ name, level, types, baseStats, moves, spriteFront, spriteBack }) {
        const maxHealth = Math.floor((2 * baseStats.hp * level) / 100) + level + 10;
        super(name, maxHealth);
        this.level = level;
        this.types = types;
        this.stats = baseStats;
        this.moves = moves;
        this.spriteFront = spriteFront;
        this.spriteBack = spriteBack;
        this.attackStat = Math.floor((2 * this.stats.attack * this.level) / 100) + 5;
        this.defenseStat = Math.floor((2 * this.stats.defense * this.level) / 100) + 5;
        this.speedStat = Math.floor((2 * this.stats.speed * this.level) / 100) + 5;
    }

    calculateDamage(move, defender) {
        if (move.power <= 0) return { amount: 0, effectiveness: 1 };

        const levelFactor = (2 * this.level) / 5 + 2;
        const statFactor = this.attackStat / defender.defenseStat;
        let baseDamage = ((levelFactor * move.power * statFactor) / 50) + 2;

        let stab = this.types.includes(move.type) ? 1.5 : 1;
        let effectiveness = TypeChart.getMultiplier(move.type, defender.types);
        let rand = (Math.random() * 15 + 85) / 100;

        const finalDamage = Math.floor(baseDamage * stab * effectiveness * rand);
        return { amount: Math.max(1, finalDamage), effectiveness };
    }
}