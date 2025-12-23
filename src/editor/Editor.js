export class Editor {
    constructor(game) {
        this.game = game;
        this.selectedEntity = null;

        this.ui = {
            btnRun: document.getElementById('btn-run'),
            btnPause: document.getElementById('btn-pause'),
            btnReset: document.getElementById('btn-reset'),
            btnStep: document.getElementById('btn-step'),
            status: document.getElementById('engine-status'),
            entityList: document.getElementById('entity-list'),
            props: {
                id: document.getElementById('prop-id'),
                type: document.getElementById('prop-type'),
                x: document.getElementById('prop-x'),
                y: document.getElementById('prop-y')
            }
        };

        this.bindEvents();
        this.uiLoopId = setInterval(() => this.updateUI(), 100);
    }

    bindEvents() {
        this.ui.btnRun.addEventListener('click', () => {
            this.game.resume();
        });

        this.ui.btnPause.addEventListener('click', () => {
            this.game.pause();
        });

        this.ui.btnReset.addEventListener('click', () => {
            this.game.reset(); // This now triggers StateManager reset to InitialState
        });

        this.ui.btnStep.addEventListener('click', () => {
            this.game.step();
        });
    }

    updateUI() {
        // Show Engine State AND Game Flow State
        const flowState = this.game.stateManager ? this.game.stateManager.currentState : "BOOT";
        // We don't have an explicit 'running/paused' prop in game anymore, we rely on loop or explicit flag
        // Let's assume Game.js methods handle loop.

        this.ui.status.textContent = `FLOW: ${flowState}`;

        this.refreshEntityList();

        if (this.selectedEntity) {
            this.ui.props.id.textContent = this.selectedEntity.id || "Entity";
            this.ui.props.type.textContent = this.selectedEntity.type;
            this.ui.props.x.textContent = Math.round(this.selectedEntity.x);
            this.ui.props.y.textContent = Math.round(this.selectedEntity.y);
        } else {
            this.ui.props.id.textContent = "-";
            this.ui.props.type.textContent = "-";
            this.ui.props.x.textContent = "-";
            this.ui.props.y.textContent = "-";
        }
    }

    refreshEntityList() {
        const entities = this.game.entities.getAll();

        if (this.ui.entityList.childElementCount !== entities.length) {
            this.ui.entityList.innerHTML = '';
            entities.forEach((ent, index) => {
                const li = document.createElement('li');
                li.textContent = `[${ent.id || index}] ${ent.type}`;
                li.addEventListener('click', () => {
                    this.selectEntity(ent, li);
                });
                this.ui.entityList.appendChild(li);

                if (this.selectedEntity === ent) {
                    li.classList.add('selected');
                }
            });
        }
    }

    selectEntity(entity, liElement) {
        this.selectedEntity = entity;
        Array.from(this.ui.entityList.children).forEach(c => c.classList.remove('selected'));
        liElement.classList.add('selected');
    }
}
