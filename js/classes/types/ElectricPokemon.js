import TrainedPokemon from '../TrainedPokemon.js';

export default class ElectricPokemon extends TrainedPokemon {
    constructor(name, level, maxHealth, powerPoints) {
        super(name, level, maxHealth, powerPoints);
    }

    // Polimorfismo: sobrescribe useAbility
    useAbility(target) {
        const cost = 5;
        if (this.powerPoints >= cost) {
            this.powerPoints -= cost;
            // Probabilidad de daño crítico
            const isCrit = Math.random() > 0.6;
            const baseDamage = Math.floor(this.level * 3 + 5);
            const finalDamage = isCrit ? parseInt(baseDamage * 1.5) : baseDamage;
            const damageMsg = target.takeDamage(finalDamage);
            const critMsg = isCrit ? "¡Un golpe crítico! " : "";
            return `${this.name} usó Impactrueno. ${critMsg}${damageMsg}`;
        }
        return `${this.name} no le quedan PP para Impactrueno.`;
    }
}
