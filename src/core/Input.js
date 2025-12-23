export class Input {
    constructor() {
        this.keys = new Map();
        this.prevKeys = new Map();
        this.actions = new Map();

        // Default bindings
        this.bind('ArrowLeft', 'LEFT');
        this.bind('ArrowRight', 'RIGHT');
        this.bind('ArrowUp', 'JUMP');
        this.bind('ArrowDown', 'DOWN');
        this.bind('KeyA', 'LEFT');
        this.bind('KeyD', 'RIGHT');
        this.bind('KeyW', 'JUMP');
        this.bind('KeyS', 'DOWN');
        this.bind('Space', 'JUMP');

        // Event listeners
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    bind(code, action) {
        this.actions.set(code, action);
    }

    onKeyDown(e) {
        const action = this.actions.get(e.code);
        if (action) {
            this.keys.set(action, true);
        }
    }

    onKeyUp(e) {
        const action = this.actions.get(e.code);
        if (action) {
            this.keys.set(action, false);
        }
    }

    update() {
        // Copy current state to prev state for "just pressed" checks
        this.prevKeys = new Map(this.keys);
    }

    isDown(action) {
        return !!this.keys.get(action);
    }

    isPressed(action) {
        return !!this.keys.get(action) && !this.prevKeys.get(action);
    }
}
