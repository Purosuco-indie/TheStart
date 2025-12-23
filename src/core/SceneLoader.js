import { Entity } from '../entities/Entity.js';

export class SceneLoader {
    constructor(game) {
        this.game = game;
        this.behaviors = {}; // Registry of behaviors
    }

    registerBehavior(name, fn) {
        this.behaviors[name] = fn;
    }

    load(sceneData) {
        this.game.logger.log(`Loading Scene: ${sceneData.name}`);

        // Clear existing
        this.game.entities.entities = [];

        // Create entities from JSON
        sceneData.entities.forEach(def => {
            const ent = new Entity(def.x, def.y, def.w, def.h, def.type);
            ent.id = def.id;

            // Attach behavior if defined
            if (def.behavior && this.behaviors[def.behavior]) {
                const behaviorFn = this.behaviors[def.behavior];
                behaviorFn(ent, this.game, def); // Pass def for extra props like 'action'
            }

            // Special handling for text rendering in menu (Mock for now)
            if (def.text) {
                ent.draw = (r) => {
                    r.rect(ent.x, ent.y, ent.w, ent.h, ent.type);
                    // This is a hack for MVP text rendering in the raw style
                    // In a real version, we'd have a TextEntity
                    r.ctx.fillStyle = "black";
                    r.ctx.font = "20px monospace";
                    r.ctx.fillText(def.text, ent.x + 10, ent.y + 35);
                };
            }

            this.game.add(ent);
        });
    }
}
