export default class Move {
    constructor({ name, type, power, accuracy, pp }) {
        this.name = name;
        this.type = type;
        this.power = power || 0;
        this.accuracy = accuracy || 100;
        this.maxPp = pp;
        this.pp = pp;
    }

    use() {
        if (this.pp <= 0) return { success: false, reason: "No pp" };
        
        this.pp--;
        
        const hitRoll = Math.random() * 100;
        if (hitRoll > this.accuracy) {
            return { success: false, reason: "miss" };
        }
        return { success: true };
    }
}
