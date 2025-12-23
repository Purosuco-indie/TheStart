import { LineDrawer } from './LineDrawer.js';

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.drawer = new LineDrawer();
    }

    clear(color = '#FFFFFF') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    // Primitive shapes
    line(x1, y1, x2, y2, type) {
        this.drawer.line(this.ctx, x1, y1, x2, y2, type);
    }

    rect(x, y, w, h, type) {
        this.drawer.rect(this.ctx, x, y, w, h, type);
    }

    // Debug helper
    text(str, x, y) {
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '12px monospace';
        this.ctx.fillText(str, x, y);
    }
}
