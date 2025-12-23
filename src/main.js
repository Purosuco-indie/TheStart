import { Game } from './core/Game.js';
import { Editor } from './editor/Editor.js';

window.addEventListener('load', () => {
    const game = new Game('gameCanvas');
    const editor = new Editor(game);

    // --- BEHAVIOR REGISTRY (The "Code" part of the separation) ---
    // In a full engine, these would be in separate files imported by name

    // 1. Menu Button Behavior
    game.stateManager.loader.registerBehavior("ButtonBehavior", (ent, gameInstance, def) => {
        // Simple click detection for MVP (using mouse coordinates relative to canvas would be needed)
        // For now, we mimic "Start" on key press or simple interaction if we had mouse input implemented.
        // Let's use SPACE to trigger "Start" if in Menu

        ent.update = (dt) => {
            if (gameInstance.input.isPressed('JUMP')) { // Space
                if (def.action) {
                    gameInstance.stateManager.trigger(def.action);
                }
            }
        };
    });

    // 2. Player Behavior
    game.stateManager.loader.registerBehavior("PlayerBehavior", (player, gameInstance) => {
        player.type = "FUNCTIONAL";
        player.vx = 0;
        player.vy = 0;

        player.update = (dt) => {
            player.vy += 600 * dt; // Gravity
            player.y += player.vy * dt;
            player.x += player.vx * dt;

            // Controls
            if (gameInstance.input.isDown('LEFT')) player.x -= 200 * dt;
            if (gameInstance.input.isDown('RIGHT')) player.x += 200 * dt;
            if (gameInstance.input.isPressed('JUMP')) player.vy = -300;

            // Bounds Check
            if (player.y > 600) { // Fell off world
                gameInstance.stateManager.trigger("LOSE");
            }

            // Fake Collision with implicit floor (hardcoded for MVP level1 json)
            // Real collision handles via CollisionManager, but we need to ensure the objects have friction/restitution
            // For now CollisionManager separates them, we just need to zero velocity if standing
            // We'll leave physics simple for now.
        };

        // Custom draw for player eyes
        player.draw = (r) => {
            r.rect(player.x, player.y, player.w, player.h, "FUNCTIONAL");
            r.line(player.x + 10, player.y + 10, player.x + 10, player.y + 20, "NARRATIVE");
            r.line(player.x + 30, player.y + 10, player.x + 30, player.y + 20, "NARRATIVE");
        }
    });

    // 3. Title Animation
    game.stateManager.loader.registerBehavior("TitleBehavior", (ent) => {
        let timer = 0;
        const startY = ent.y;
        ent.update = (dt) => {
            timer += dt * 5;
            ent.y = startY + Math.sin(timer) * 5; // Float effect
            ent.type = "NARRATIVE"; // Force sketchy style
        };
    });

    // Boot
    game.init();

    window.game = game;
    window.editor = editor;
});
