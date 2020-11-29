import p5 from 'p5';
import { WIDTH, HEIGHT, DEBUG } from '../constants';


class Obstacle {
    r = 20;
    hit = false;

    /**
     * Creates an obstacle.
     * @param sketch p5 sketch
     * @param {*} x center X
     * @param {*} y center Y
     * @param {*} r radius
     */
    constructor(sketch, x, y) {
        this.pos = sketch.createVector(x, y);
        this.r = 40;
        this.sketch = sketch;
    }

    /**
     * Renders the obstacle circle.
     */
    show() {
        this.sketch.noFill();
        this.sketch.stroke(this.hit ? 'red' : 200);
        this.sketch.strokeWeight(1);
        this.sketch.circle(this.pos.x, this.pos.y, this.r * 2);

        this.sketch.strokeWeight(this.r / 3);
        this.sketch.stroke('yellow');
        this.sketch.point(this.pos.x, this.pos.y);

        if (DEBUG()) {
            this.sketch.noStroke();
            this.sketch.fill(170);
            this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
            this.sketch.text(`x: ${this.pos.x}, y: ${this.pos.y}, r: ${this.r}`, this.pos.x, this.pos.y);
        }
    }
}

export default Obstacle;