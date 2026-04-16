import BasePokemon from './BasePokemon.js';

export default class TrainedPokemon extends BasePokemon {
    constructor(name, level, maxHealth, powerPoints) {
        super(name, level, maxHealth);
        this.powerPoints = powerPoints;
        this.maxPowerPoints = powerPoints;
    }

    attack(target) {
        const damage = Math.floor(this.level * 2 + Math.random() * 4);
        const damageMsg = target.takeDamage(damage);
        return `${this.name} usó Placaje. ${damageMsg}`;
    }

    useAbility(target) {
        throw new Error("El método useAbility debe ser sobrescrito mediante Polimorfismo.");
    }
}
