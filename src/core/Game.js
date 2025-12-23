import { Loop } from './Loop.js';
import { Input } from './Input.js';
import { EntityManager } from '../entities/Entity.js';
import { Renderer } from '../render/Renderer.js';
import { CollisionManager } from '../physics/Collision.js';
import { Logger } from '../utils/Logger.js';
import { StateManager } from './StateManager.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with id '${canvasId}' not found`);
        }
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.loop = new Loop();
        this.input = new Input();
        this.renderer = new Renderer(this.ctx);
        this.entities = new EntityManager();
        this.collision = new CollisionManager();
        this.logger = new Logger();

        // Data-Driven State Manager
        this.stateManager = new StateManager(this);
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    async init() {
        await this.stateManager.init();
        this.start(); // Auto-start the loop (but logic depends on state)
    }

    start() {
        this.loop.start(
            (dt) => this.update(dt),
            () => this.render()
        );
    }

    stop() {
        this.loop.stop();
    }

    // Editor bridge methods
    pause() { this.loop.stop(); }
    resume() { this.start(); }

    // Reset now means "Return to Flow Initial State" or "Restart Scene"
    reset() {
        this.stateManager.transitionTo(this.stateManager.flow.initialState);
    }

    step() {
        this.update(0.016);
        this.render();
    }

    add(entity) {
        this.entities.add(entity);
    }

    update(dt) {
        this.input.update();

        // Only update entities if valid state (e.g. not loading)
        this.entities.update(dt);
        this.collision.resolve(this.entities);
    }

    render() {
        this.renderer.clear('#FFFFFF');
        this.entities.draw(this.renderer);
    }
}
