import { Game } from './core/Game.js';
import { Entity } from './entities/Entity.js';

// Bootstrap
window.addEventListener('load', () => {
    const game = new Game('gameCanvas');
    window.game = game; // Expose for debugging

    // Dev Tools UI
    const btnRun = document.getElementById('btn-run');
    const btnPause = document.getElementById('btn-pause');

    btnRun.addEventListener('click', () => {
        game.start();
        game.logger.log("Comando: RODAR");
    });

    btnPause.addEventListener('click', () => {
        game.stop();
        game.logger.log("Comando: PAUSAR");
    });

    // --- EXAMPLE SETUP ---
    // Creating some floor
    const floor = new Entity(100, 500, 600, 50, "STRUCTURAL");
    game.add(floor);

    // Creating a player
    const player = new Entity(200, 200, 40, 40, "FUNCTIONAL");
    player.update = (dt) => {
        // Simple gravity
        player.vy += 500 * dt;
        player.y += player.vy * dt;
        player.x += player.vx * dt;

        // Simple Controls
        if (game.input.isDown('LEFT')) player.x -= 200 * dt;
        if (game.input.isDown('RIGHT')) player.x += 200 * dt;

        // Floor Collision (Hardcoded for now just to prove it works before AABB)
        if (player.y + player.h > floor.y &&
            player.x + player.w > floor.x &&
            player.x < floor.x + floor.w) {

            player.y = floor.y - player.h;
            player.vy = 0;

            if (game.input.isPressed('JUMP')) {
                player.vy = -300;
            }
        }
    };
    // Override draw to use renderer line types correctly? 
    // Actually Base Entity doesn't know about specialized drawing.
    // Let's monkey-patch draw for this example or update Entity to use proper type.
    player.draw = (renderer) => {
        renderer.rect(player.x, player.y, player.w, player.h, "FUNCTIONAL");
    };

    floor.draw = (renderer) => {
        renderer.rect(floor.x, floor.y, floor.w, floor.h, "STRUCTURAL");
    };

    game.add(player);
});
