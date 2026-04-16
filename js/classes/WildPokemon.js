import BasePokemon from './BasePokemon.js';

export default class WildPokemon extends BasePokemon {
    constructor(name, level, maxHealth, powerPoints) {
        super(name, level, maxHealth);
        this.powerPoints = powerPoints;
        this.maxPowerPoints = powerPoints;
    }

    attack(target) {
        const damage = Math.floor(this.level * 1.5 + Math.random() * 6);
        const damageMsg = target.takeDamage(damage);
        return `${this.name} salvaje usó Arañazo. ${damageMsg}`;
    }

    useAbility(target) {
        // Fallback básico para Pokémon salvajes no tan especializados
        return this.attack(target);
    }
}
