export default class BattleManager {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        
        this.ui = {
            log: document.getElementById('log-text'),
            actionBox: document.getElementById('action-box'),
            playerName: document.getElementById('player-name'),
            playerLvl: document.getElementById('player-level'),
            playerHpFill: document.getElementById('player-hp-fill'),
            playerHpText: document.getElementById('player-hp-text'),
            playerHpMax: document.getElementById('player-hp-max'),
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
        this.ui.playerSprite.src = this.player.spriteBack;
        
        this.ui.enemyName.innerText = this.enemy.name;
        this.ui.enemyLvl.innerText = this.enemy.level;
        this.ui.enemySprite.src = this.enemy.spriteFront;

        this.setupActionButtons();
        this.updateUI();
        this.log(`¡Un ${this.enemy.name.toUpperCase()} salvaje apareció!`);
    }

    setupActionButtons() {
        this.ui.actionBox.innerHTML = '';
        
        this.player.moves.forEach((move, i) => {
            const btn = document.createElement('button');
            btn.className = `action-btn type-${move.type}`;
            btn.innerHTML = `${move.name} <br><span class="pp-cost">PP: ${move.pp}/${move.maxPp}</span>`;
            
            btn.addEventListener('click', () => {
                const moveResult = move.use();
                btn.innerHTML = `${move.name} <br><span class="pp-cost">PP: ${move.pp}/${move.maxPp}</span>`;

                if (!moveResult.success) {
                    if (moveResult.reason === "No pp") {
                        this.log(`¡No quedan PP para ${move.name}!`);
                        return;
                    }
                }
                
                this.executeTurnCycle(move, moveResult);
            });
            this.ui.actionBox.appendChild(btn);
        });
    }

    updateUI() {
        this.ui.playerHpText.innerText = this.player.health;
        const pHealthPct = (this.player.health / this.player.maxHealth) * 100;
        this.ui.playerHpFill.style.width = Math.max(0, pHealthPct) + '%';
        this.ui.playerHpFill.style.backgroundColor = this.getHealthColor(pHealthPct);

        const eHealthPct = (this.enemy.health / this.enemy.maxHealth) * 100;
        this.ui.enemyHpFill.style.width = Math.max(0, eHealthPct) + '%';
        this.ui.enemyHpFill.style.backgroundColor = this.getHealthColor(eHealthPct);
    }

    getHealthColor(percentage) {
        if (percentage > 50) return 'var(--hp-high)';
        if (percentage > 20) return 'var(--hp-med)';
        return 'var(--hp-low)';
    }

    log(msg) { this.ui.log.innerText = msg; }
    
    toggleButtons(disabled) {
        const btns = this.ui.actionBox.querySelectorAll('button');
        btns.forEach(b => b.disabled = disabled);
    }

    async resolveAttack(attacker, defender, move, isHit, attackerSprite, defenderSprite) {
        this.log(`¡${attacker.name.toUpperCase()} usó ${move.name}!`);
        attackerSprite.classList.add('attack-anim');
        await new Promise(r => setTimeout(r, 300));
        attackerSprite.classList.remove('attack-anim');

        if (!isHit) {
            this.log(`... pero el ataque falló.`);
            await new Promise(r => setTimeout(r, 1200));
            return;
        }

        const dmgObj = attacker.calculateDamage(move, defender);
        defender.takeDamage(dmgObj.amount);
        
        defenderSprite.classList.add('damage-anim');
        await new Promise(r => setTimeout(r, 600));
        defenderSprite.classList.remove('damage-anim');

        this.updateUI();

        if (dmgObj.effectiveness >= 2) {
            this.log(`¡Es muy eficaz!`);
            await new Promise(r => setTimeout(r, 1200));
        } else if (dmgObj.effectiveness <= 0.5) {
            this.log(`No es muy eficaz...`);
            await new Promise(r => setTimeout(r, 1200));
        }
    }

    async executeTurnCycle(playerMove, playerMoveResult) {
        this.toggleButtons(true);

        const eMoveIdx = Math.floor(Math.random() * this.enemy.moves.length);
        const enemyMove = this.enemy.moves[eMoveIdx];
        const enemyMoveResult = enemyMove.use();

        const playerFaster = this.player.speedStat >= this.enemy.speedStat;


        const order = playerFaster ? 
            [{ actor: this.player, def: this.enemy, move: playerMove, hit: playerMoveResult.success, aSprite: this.ui.playerSprite, dSprite: this.ui.enemySprite },
             { actor: this.enemy, def: this.player, move: enemyMove, hit: enemyMoveResult.success, aSprite: this.ui.enemySprite, dSprite: this.ui.playerSprite }] 
          : [{ actor: this.enemy, def: this.player, move: enemyMove, hit: enemyMoveResult.success, aSprite: this.ui.enemySprite, dSprite: this.ui.playerSprite },
             { actor: this.player, def: this.enemy, move: playerMove, hit: playerMoveResult.success, aSprite: this.ui.playerSprite, dSprite: this.ui.enemySprite }];

        for (let i = 0; i < order.length; i++) {
            const step = order[i];
            if (!step.actor.isAlive) continue;

            await this.resolveAttack(step.actor, step.def, step.move, step.hit, step.aSprite, step.dSprite);
            
            if (!step.def.isAlive) {
                this.log(`¡${step.def.name.toUpperCase()} se ha debilitado!`);
                await new Promise(r => setTimeout(r, 1500));
                step.dSprite.style.opacity = '0';
                step.dSprite.style.transition = 'opacity 1s';
                
                this.log(step.def === this.enemy ? '¡Ganaste el combate!' : '¡Perdiste el combate!');
                return; 
            }
            await new Promise(r => setTimeout(r, 500));
        }

        this.toggleButtons(false);
    }
}
