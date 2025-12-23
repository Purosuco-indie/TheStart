export class LineDrawer {
    constructor() {
        // Configuration for different line types
        this.styles = {
            STRUCTURAL: {
                color: '#000000',
                thickness: 3,
                noise: 0.5,
                passes: 1,
                breakChance: 0
            },
            FUNCTIONAL: {
                color: '#000000',
                thickness: 2,
                noise: 1.5,
                passes: 2,
                breakChance: 0.05
            },
            NARRATIVE: {
                color: '#000000',
                thickness: 1,
                noise: 3.0,
                passes: 1,
                breakChance: 0.2
            }
        };
    }

    /**
     * Draws a line from (x1, y1) to (x2, y2) using the specified style.
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @param {string} type - 'STRUCTURAL', 'FUNCTIONAL', or 'NARRATIVE'
     */
    line(ctx, x1, y1, x2, y2, type = "FUNCTIONAL") {
        const style = this.styles[type] || this.styles.FUNCTIONAL;

        ctx.beginPath();
        ctx.strokeStyle = style.color;
        ctx.lineWidth = style.thickness;
        ctx.lineCap = 'round';

        // Draw multiple passes for "sketchy" look
        for (let i = 0; i < style.passes; i++) {
            if (Math.random() < style.breakChance) continue; // Simulate line break/failure

            this._drawLinePass(ctx, x1, y1, x2, y2, style.noise);
        }
        ctx.stroke();
    }

    _drawLinePass(ctx, x1, y1, x2, y2, noiseAmount) {
        // Divide line into segments
        const dist = Math.hypot(x2 - x1, y2 - y1);
        const steps = Math.max(1, Math.floor(dist / 10)); // One point every 10px

        ctx.moveTo(x1, y1);

        for (let i = 1; i < steps; i++) {
            const t = i / steps;
            let tx = x1 + (x2 - x1) * t;
            let ty = y1 + (y2 - y1) * t;

            // Add perpendicular noise
            const offsetX = (Math.random() - 0.5) * noiseAmount;
            const offsetY = (Math.random() - 0.5) * noiseAmount;

            ctx.lineTo(tx + offsetX, ty + offsetY);
        }

        ctx.lineTo(x2, y2);
    }

    /**
     * Helper for rectangles using lines
     */
    rect(ctx, x, y, w, h, type = "FUNCTIONAL") {
        // Draw 4 lines. Sometimes they might overshoot or not connect perfectly.
        this.line(ctx, x, y, x + w, y, type);         // Top
        this.line(ctx, x + w, y, x + w, y + h, type); // Right
        this.line(ctx, x + w, y + h, x, y + h, type); // Bottom
        this.line(ctx, x, y + h, x, y, type);         // Left
    }
}
