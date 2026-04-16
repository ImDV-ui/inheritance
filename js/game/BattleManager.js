export default class BattleManager {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        

        this.ui = {
            log: document.getElementById('log-text'),
            btnAttack: document.getElementById('btn-attack'),
            btnAbility: document.getElementById('btn-ability'),
            
            playerName: document.getElementById('player-name'),
            playerLvl: document.getElementById('player-level'),
            playerHpFill: document.getElementById('player-hp-fill'),
            playerHpText: document.getElementById('player-hp-text'),
            playerHpMax: document.getElementById('player-hp-max'),
            playerPpFill: document.getElementById('player-pp-fill'),
            playerPpText: document.getElementById('player-pp-text'),
            playerPpMax: document.getElementById('player-pp-max'),
            playerSprite: document.getElementById('player-sprite'),
            
            enemyName: document.getElementById('enemy-name'),
            enemyLvl: document.getElementById('enemy-level'),
            enemyHpFill: document.getElementById('enemy-hp-fill'),
            enemySprite: document.getElementById('enemy-sprite'),
        };

        this.initBattle();
    }

    initBattle() {

        this.ui.playerName.innerText = this.player.name;
        this.ui.playerLvl.innerText = this.player.level;
        this.ui.playerHpMax.innerText = this.player.maxHealth;
        this.ui.playerPpMax.innerText = this.player.maxPowerPoints;
        
        this.ui.enemyName.innerText = this.enemy.name;
        this.ui.enemyLvl.innerText = this.enemy.level;

        this.updateUI();
        this.log(`¡Un ${this.enemy.name} salvaje apareció!`);
        this.bindEvents();
    }

    updateUI() {

        this.ui.playerHpText.innerText = this.player.health;
        const pHealthPct = (this.player.health / this.player.maxHealth) * 100;
        this.ui.playerHpFill.style.width = `${pHealthPct}%`;
        this.ui.playerHpFill.style.backgroundColor = this.getHealthColor(pHealthPct);


        this.ui.playerPpText.innerText = this.player.powerPoints;
        const pPpPct = (this.player.powerPoints / this.player.maxPowerPoints) * 100;
        this.ui.playerPpFill.style.width = `${pPpPct}%`;
        

        const eHealthPct = (this.enemy.health / this.enemy.maxHealth) * 100;
        this.ui.enemyHpFill.style.width = `${eHealthPct}%`;
        this.ui.enemyHpFill.style.backgroundColor = this.getHealthColor(eHealthPct);
    }

    getHealthColor(percentage) {
        if (percentage > 50) return 'var(--hp-high)';
        if (percentage > 20) return 'var(--hp-med)';
        return 'var(--hp-low)';
    }

    log(message) {

        this.ui.log.innerText = message;
    }

    bindEvents() {
        this.ui.btnAttack.addEventListener('click', () => this.handlePlayerAction('attack'));
        this.ui.btnAbility.addEventListener('click', () => this.handlePlayerAction('ability'));
    }

    toggleButtons(disabled) {
        this.ui.btnAttack.disabled = disabled;
        this.ui.btnAbility.disabled = disabled;
    }

    async handlePlayerAction(actionType) {
        if (!this.player.isAlive || !this.enemy.isAlive) return;
        
        this.toggleButtons(true);
        

        this.ui.playerSprite.classList.add('attack-anim');
        setTimeout(() => this.ui.playerSprite.classList.remove('attack-anim'), 100);

        let actionMsg = "";
        if (actionType === 'attack') {
            actionMsg = this.player.attack(this.enemy);
        } else {
            actionMsg = this.player.useAbility(this.enemy);
        }

        this.log(actionMsg);
        

        this.ui.enemySprite.classList.add('damage-anim');
        setTimeout(() => this.ui.enemySprite.classList.remove('damage-anim'), 500);

        this.updateUI();

        if (!this.enemy.isAlive) {
            setTimeout(() => this.log(`¡Ganaste! ${this.enemy.name} fue derrotado.`), 1500);
            return;
        }


        setTimeout(() => this.executeEnemyTurn(), 2000);
    }

    executeEnemyTurn() {
        if (!this.enemy.isAlive) return;


        this.ui.enemySprite.classList.add('attack-anim');
        setTimeout(() => this.ui.enemySprite.classList.remove('attack-anim'), 100);


        let actionMsg = "";
        const u = Math.random();
        if (u < 0.3 && this.enemy.powerPoints >= 5) {
             actionMsg = this.enemy.useAbility(this.player);
        } else {
             actionMsg = this.enemy.attack(this.player);
        }

        this.log(actionMsg);
        

        this.ui.playerSprite.classList.add('damage-anim');
        setTimeout(() => this.ui.playerSprite.classList.remove('damage-anim'), 500);

        this.updateUI();

        if (!this.player.isAlive) {
            setTimeout(() => {
                this.log(`¡Has perdido! ${this.player.name} se ha debilitado.`);
                this.ui.playerSprite.style.opacity = '0';
                this.ui.playerSprite.style.transition = 'opacity 1s';
            }, 1000);
            return;
        }


        this.toggleButtons(false);
    }
}
