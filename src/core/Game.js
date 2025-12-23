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

        // Debug info
        this.debug = {
            fps: 0,
            entityCount: 0
        };
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        this.logger.log("Puro Suco Indie Engine Starting...");
        this.loop.start(
            (dt) => this.update(dt),
            () => this.render()
        );
    }

    stop() {
        this.loop.stop();
        this.logger.log("Engine Stopped.");
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
