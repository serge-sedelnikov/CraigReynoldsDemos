import p5 from 'p5';
import { WIDTH, HEIGHT, DEBUG } from '../constants';

class Field {

    cellSize = 20;
    maxForce = 1.3;
    forces = [];

    constructor(sketch) {
        this.sketch = sketch;
        this.rows = sketch.floor(HEIGHT / this.cellSize);
        this.cols = sketch.floor(WIDTH / this.cellSize);

        // initialize all forces
        this.update();
    }

    /**
     * Randomly updates the force fields
     */
    update() {
        const length = this.cols * this.rows;
        for (let i = 0; i < length; i++) {
            this.forces[i] = Math.PI / 4.0;
        }
    }

    /**
     * Shows the field
     */
    show() {
        if (DEBUG()) {
            this.sketch.noFill();
            this.sketch.stroke(100);
            this.sketch.strokeWeight(1);


            for (let i = 0; i < this.rows; i++) {
                this.sketch.line(0, i * this.cellSize, WIDTH, i * this.cellSize);
            }

            for (let i = 0; i < this.cols; i++) {
                this.sketch.line(i * this.cellSize, 0, i * this.cellSize, HEIGHT);
            }
        }

        // draw
        this.sketch.noFill();
        this.sketch.stroke('yellow');
        this.sketch.strokeWeight(1);

        for (let i = 0; i < this.forces.length; i++) {
            const x = this.sketch.floor(i % this.cols) * this.cellSize;
            const y = this.sketch.floor(i / this.cols) * this.cellSize;
            const angle = this.forces[i];

        
            this.sketch.push();
            
            this.sketch.translate(x, y);
            this.sketch.rotate(-angle);
            this.sketch.line(0, 0, 0, this.cellSize);
            this.sketch.pop();
        }
    }
}

export default Field;