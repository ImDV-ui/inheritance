export default class BasePokemon {
    constructor(name, level, maxHealth) {
        this.name = name;
        this.level = level;
        this.maxHealth = maxHealth;
        this.health = maxHealth; // HP actual al máximo
        this.isAlive = true;
    }

    takeDamage(amount) {
        if (!this.isAlive) return `${this.name} ya está debilitado.`;
        
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
            return `${this.name} recibió ${amount} puntos de daño. ¡Se ha debilitado!`;
        }
        return `${this.name} recibió ${amount} puntos de daño.`;
    }
}
