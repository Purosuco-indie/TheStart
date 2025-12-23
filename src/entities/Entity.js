export class Entity {
    constructor(x, y, w, h, type = "FUNCTIONAL") {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 0;
        this.vy = 0;
        this.type = type; // STRUCTURAL, FUNCTIONAL, NARRATIVE
        this.isSolid = true;
        this.markedForDeletion = false;
        this.color = '#000000'; // Default ink color
    }

    update(dt) {
        // Basic movement integration
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    draw(renderer) {
        // Default representation just to see something
        // In the future this will use renderer.rect(...)
        // For now, if renderer is ctx:
        if (renderer.fillStyle !== undefined) {
            renderer.fillStyle = this.color;
            renderer.strokeStyle = this.color;
            renderer.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
}

export class EntityManager {
    constructor() {
        this.entities = [];
    }

    add(entity) {
        this.entities.push(entity);
    }

    update(dt) {
        // Filter out deleted
        this.entities = this.entities.filter(e => !e.markedForDeletion);

        for (const entity of this.entities) {
            entity.update(dt);
        }
    }

    draw(renderer) {
        for (const entity of this.entities) {
            entity.draw(renderer);
        }
    }

    // Getters for collision
    getAll() {
        return this.entities;
    }
}
