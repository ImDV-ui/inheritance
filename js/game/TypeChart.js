export default class TypeChart {

    static getMultiplier(moveType, defenderTypes) {
        let multiplier = 1;
        if (!this.effectivity[moveType]) return 1;

        defenderTypes.forEach(defType => {
            const chart = this.effectivity[moveType];
            if (chart.hasOwnProperty(defType)) {
                multiplier *= chart[defType];
            }
        });
        return multiplier;
    }
}
