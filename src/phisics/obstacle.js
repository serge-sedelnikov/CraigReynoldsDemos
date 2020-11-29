import p5 from 'p5';
import { WIDTH, HEIGHT, DEBUG } from '../constants';


class Obstacle {
    r = 20;

    /**
     * Creates an obstacle.
     * @param sketch p5 sketch
     * @param {*} x center X
     * @param {*} y center Y
     * @param {*} r radius
     */
    constructor(sketch, x, y, r = 20) {
        this.pos = sketch.createVector(x, y);
        this.r = r;
        this.sketch = sketch;
    }

    /**
     * Renders the obstacle circle.
     */
    show() {
        this.sketch.noFill();
        this.sketch.stroke(200);
        this.sketch.strokeWeight(1);
        this.sketch.circle(this.pos.x, this.pos.y, this.r * 2);

        if (DEBUG()) {
            this.sketch.noStroke();
            this.sketch.fill(170);
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            this.sketch.text(`x: ${this.pos.x}, y: ${this.pos.y}, r: ${this.r}`, this.pos.x, this.pos.y);
        }
    }
}

export default Obstacle;