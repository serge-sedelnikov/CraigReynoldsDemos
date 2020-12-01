import p5 from 'p5';
import { WIDTH, HEIGHT, DEBUG } from '../constants';

class Field {

    xoff = 0;
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
        
        // if(this.sketch.frameCount % 5 !== 0){
        //     return;
        // }

        const length = 2 * this.cols * this.rows;
        const noise = this.sketch.noise(this.xoff) * (Math.PI * 2);
        
        // change noise factor, but make it max 10 to save memory
        this.xoff += 0.01;
        this.xoff = this.xoff % 10;

        for (let i = 0; i < length; i++) {
            const x = this.sketch.floor(i % this.cols);
            const y = this.sketch.floor(i / this.cols);
            
            // calculate angle that is making a circle out of vector field
            const coordinates = this.sketch.createVector(x, y);
            const center = this.sketch.createVector(this.cols / 2, this.rows / 2);
            const circleAngle = coordinates.sub(center).heading();

            // add noice factor to simulate wind
            this.forces[i] = noise + circleAngle;
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
        this.sketch.stroke('#b3a87f');
        this.sketch.strokeWeight(1);

        for (let i = 0; i < this.forces.length; i++) {
            const x = this.sketch.floor(i % this.cols) * this.cellSize;
            const y = this.sketch.floor(i / this.cols) * this.cellSize;
            const angle = this.forces[i];
        
            this.sketch.push();
            this.sketch.translate(x, y);
            this.sketch.rotate(angle);
            this.sketch.line(0, 0, 0, this.cellSize);
            this.sketch.pop();
        }
    }
}

export default Field;