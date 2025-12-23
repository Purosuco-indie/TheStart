export class Logger {
    constructor() {
        this.panel = document.getElementById('log-panel');
    }

    log(msg) {
        console.log(`[PuroSuco] ${msg}`);
        if (this.panel) {
            const line = document.createElement('div');
            line.textContent = `> ${msg}`;
            this.panel.appendChild(line);
            this.panel.scrollTop = this.panel.scrollHeight;
        }
    }

    error(msg) {
        console.error(`[PuroSuco] ${msg}`);
        if (this.panel) {
            const line = document.createElement('div');
            line.style.color = 'red';
            line.textContent = `[ERR] ${msg}`;
            this.panel.appendChild(line);
            this.panel.scrollTop = this.panel.scrollHeight;
        }
    }
}
