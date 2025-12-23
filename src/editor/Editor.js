export class Editor {
    constructor(game) {
        this.game = game;
        this.selectedEntity = null;

        // Cache UI Elements
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

        // Start an UI update loop (independent of game loop)
        this.uiLoopId = setInterval(() => this.updateUI(), 100);
    }

    bindEvents() {
        this.ui.btnRun.addEventListener('click', () => {
            this.game.start();
        });

        this.ui.btnPause.addEventListener('click', () => {
            this.game.pause();
        });

        this.ui.btnReset.addEventListener('click', () => {
            this.game.reset();
        });

        this.ui.btnStep.addEventListener('click', () => {
            if (this.game.state !== 'PAUSED' && this.game.state !== 'STOPPED') {
                this.game.pause();
            }
            this.game.step();
        });
    }

    updateUI() {
        // Update Status Text
        this.ui.status.textContent = `STATUS: ${this.game.state}`;

        // Update Entity List (Slow poll - simple implementation)
        // Ideally we only update on change, but for MVP polling is safer
        this.refreshEntityList();

        // Update Inspector
        if (this.selectedEntity) {
            this.ui.props.id.textContent = "Entity"; // We interpret index as ID for now
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

        // Basic diffing to avoid destroying DOM every 100ms
        // Note: For a real engine, we'd use a reactive store or event system. 
        // This is a "raw" implementation.

        // Clearing is expensive, so let's only rebuild if count differs for now
        // A better approach is to match IDs.
        if (this.ui.entityList.childElementCount !== entities.length) {
            this.ui.entityList.innerHTML = '';
            entities.forEach((ent, index) => {
                const li = document.createElement('li');
                li.textContent = `[${index}] ${ent.type}`;
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
        // Visual feedback
        Array.from(this.ui.entityList.children).forEach(c => c.classList.remove('selected'));
        liElement.classList.add('selected');
    }
}
