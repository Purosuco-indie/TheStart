import { Loop } from './Loop.js';
import { Input } from './Input.js';
import { EntityManager } from '../entities/Entity.js';
import { Renderer } from '../render/Renderer.js';
import { CollisionManager } from '../physics/Collision.js';
import { Logger } from '../utils/Logger.js';

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

        // Game State exposed for Editor
        this.state = 'STOPPED'; // STOPPED, RUNNING, PAUSED
    }

    resize() {
        // In Editor mode, canvas size might be controlled by CSS container
        // But for now, let's keep it robust
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    // --- API FOR EDITOR ---

    init() {
        // Setup initial demo scene (this would be level loading in future)
        this.reset();
    }

    start() {
        if (this.state === 'RUNNING') return;

        this.state = 'RUNNING';
        this.loop.start(
            (dt) => this.update(dt),
            () => this.render()
        );
        this.logger.log("Engine: Change State -> RUNNING");
    }

    pause() {
        if (this.state === 'PAUSED') return;
        this.state = 'PAUSED';
        this.loop.stop(); // Stop loop
        this.logger.log("Engine: Change State -> PAUSED");
        // Force one render to keep screen content
        this.render();
    }

    reset() {
        this.pause();
        this.entities.entities = []; // Clear
        this.state = 'STOPPED';

        // Re-add demo content
        // In a real engine, this would reload the "Scene"
        this.setupDemoScene();

        this.render();
        this.logger.log("Engine: RESET");
    }

    step() {
        // Advance exactly one frame (16ms)
        this.update(0.016);
        this.render();
        this.logger.log("Engine: STEP");
    }

    // --- INTERNAL ---

    setupDemoScene() {
        // Placeholder for demo scene creation
        // This is usually done externally, but for MVP we hardcode it here or Injection
        // We will leave this empty and let main.js or Editor inject content for now
        // Or better: trigger an event "onReset"
        if (this.onReset) this.onReset(this);
    }

    add(entity) {
        this.entities.add(entity);
    }

    update(dt) {
        this.input.update();
        this.entities.update(dt);
        this.collision.resolve(this.entities);
    }

    render() {
        this.renderer.clear('#FFFFFF');
        this.entities.draw(this.renderer);
    }
}
