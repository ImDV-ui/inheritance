import WildPokemon from '../WildPokemon.js';

export default class FirePokemon extends WildPokemon {
    constructor(name, level, maxHealth, powerPoints) {
        super(name, level, maxHealth, powerPoints);
    }

    // Polimorfismo: sobrescribe useAbility
    useAbility(target) {
        const cost = 5;
        if (this.powerPoints >= cost) {
            this.powerPoints -= cost;
            const damage = Math.floor(this.level * 3.5 + 8);
            const damageMsg = target.takeDamage(damage);
            return `${this.name} usó Ascuas. ¡Es muy eficaz! ${damageMsg}`;
        }
        return `${this.name} intentó usar Ascuas, pero no le quedan PP.`;
    }
}
