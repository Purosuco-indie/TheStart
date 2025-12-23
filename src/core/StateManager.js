import { SceneLoader } from './SceneLoader.js';

export class StateManager {
    constructor(game) {
        this.game = game;
        this.currentState = "BOOT";
        this.flow = null;
        this.loader = new SceneLoader(game);

        // Cache scenes (In real engine, these would be loaded async)
        this.scenes = {};
    }

    async init() {
        // Load Flow definition
        // In full web version these would be fetch() calls. 
        // For this local setup, we'll assume they are injected or we fetch them relative.
        try {
            const flowReq = await fetch('./src/data/flow.json');
            this.flow = await flowReq.json();

            this.game.logger.log("Flow Loaded.");

            // Preload Scenes (MVP: Load all at start)
            await this.loadSceneData('MENU', './src/data/menu.scene.json');
            await this.loadSceneData('GAME', './src/data/level1.scene.json');

            // Boot finished -> Go to Initial State
            this.transitionTo(this.flow.initialState);
        } catch (e) {
            this.game.logger.error("Failed to load flow/scenes: " + e.message);
        }
    }

    async loadSceneData(stateName, url) {
        const req = await fetch(url);
        this.scenes[stateName] = await req.json();
    }

    transitionTo(newState) {
        this.game.logger.log(`State Transition: ${this.currentState} -> ${newState}`);

        // Setup new state
        if (this.scenes[newState]) {
            this.loader.load(this.scenes[newState]);
            this.currentState = newState;
        } else {
            this.game.logger.error(`No scene found for state: ${newState}`);
        }

        // Helper to notify editor if needed
        if (window.editor) window.editor.updateUI();
    }

    trigger(triggerName) {
        // Find transition
        const transition = this.flow.transitions.find(t =>
            t.from === this.currentState && t.trigger === triggerName
        );

        if (transition) {
            this.transitionTo(transition.to);
        } else {
            this.game.logger.log(`Invalid trigger '${triggerName}' from state '${this.currentState}'`);
        }
    }
}
