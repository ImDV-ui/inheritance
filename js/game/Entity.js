export default class Entity {
    constructor(name, maxHealth) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.isAlive = true;
    }

    takeDamage(amount) {
        if (!this.isAlive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
    }
}