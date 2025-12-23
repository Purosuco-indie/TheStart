import { Game } from './core/Game.js';
import { Editor } from './editor/Editor.js';
import { Entity } from './entities/Entity.js';

window.addEventListener('load', () => {
    // 1. Initialize Game
    const game = new Game('gameCanvas');

    // 2. Define Demo Scene content injection
    game.onReset = (g) => {
        // Floor
        const floor = new Entity(50, 500, 700, 40, "STRUCTURAL");
        g.add(floor);

        // Wall
        const wall = new Entity(600, 350, 40, 150, "STRUCTURAL");
        g.add(wall);

        // Player
        const player = new Entity(100, 100, 40, 40, "FUNCTIONAL");
        player.update = (dt) => {
            player.vy += 600 * dt; // Gravity
            player.y += player.vy * dt;
            player.x += player.vx * dt;

            // Simple controls
            if (g.input.isDown('LEFT')) player.x -= 200 * dt;
            if (g.input.isDown('RIGHT')) player.x += 200 * dt;
            if (g.input.isPressed('JUMP')) player.vy = -300;

            // Floor collision (Naive)
            if (player.y + player.h > floor.y && player.x + player.w > floor.x && player.x < floor.x + floor.w) {
                player.y = floor.y - player.h;
                player.vy = 0;
            }
        };
        // Custom draw
        player.draw = (r) => {
            r.rect(player.x, player.y, player.w, player.h, "FUNCTIONAL");
            // Eyes
            r.line(player.x + 10, player.y + 10, player.x + 10, player.y + 20, "NARRATIVE");
            r.line(player.x + 30, player.y + 10, player.x + 30, player.y + 20, "NARRATIVE");
        };

        g.add(player);

        g.logger.log("Scene Loaded: Demo Platformer");
    };

    // 3. Initialize Editor
    const editor = new Editor(game);

    // 4. Boot
    game.init(); // Sets up the scene via onReset

    // Expose for debugging
    window.game = game;
    window.editor = editor;
});
