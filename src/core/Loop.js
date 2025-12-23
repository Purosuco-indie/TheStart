export class Loop {
    constructor() {
        this.running = false;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 FPS target
        this.rafId = null;
        
        // Callbacks
        this.update = () => {};
        this.render = () => {};
    }

    start(updateFn, renderFn) {
        if (this.running) return;
        
        this.update = updateFn;
        this.render = renderFn;
        this.running = true;
        this.lastTime = performance.now();
        this.accumulatedTime = 0;
        
        this.rafId = requestAnimationFrame(this.tick.bind(this));
    }

    stop() {
        this.running = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    tick(currentTime) {
        if (!this.running) return;

        let deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Prevent spiral of death (lag spike protection)
        if (deltaTime > 1000) {
            deltaTime = 1000;
        }

        this.accumulatedTime += deltaTime;

        // Fixed time step update
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep / 1000); // Seconds
            this.accumulatedTime -= this.timeStep;
        }

        // Render with interpolation factor (alpha) if needed roughly
        // For this minimalist style, we might just render whatever state we have
        this.render();

        this.rafId = requestAnimationFrame(this.tick.bind(this));
    }
}
