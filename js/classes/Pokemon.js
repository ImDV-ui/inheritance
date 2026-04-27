import TypeChart from '../game/TypeChart.js';

export default class Pokemon {
    constructor({ name, level, types, baseStats, moves, spriteFront, spriteBack }) {
        this.name = name;
        this.level = level;
        this.types = types;
        this.stats = baseStats;
        this.moves = moves;
        this.spriteFront = spriteFront;
        this.spriteBack = spriteBack;


        this.maxHealth = Math.floor((2 * this.stats.hp * this.level) / 100) + this.level + 10;
        this.health = this.maxHealth;
        this.isAlive = true;

        this.attackStat = Math.floor((2 * this.stats.attack * this.level) / 100) + 5;
        this.defenseStat = Math.floor((2 * this.stats.defense * this.level) / 100) + 5;
        this.speedStat = Math.floor((2 * this.stats.speed * this.level) / 100) + 5;
    }

    takeDamage(amount) {
        if (!this.isAlive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
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
