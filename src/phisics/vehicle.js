import p5 from 'p5';
import { WIDTH, HEIGHT, DEBUG } from '../constants';

/**
 * Vehicle class.
 */
class Vehicle {

    r = 8;
    maxSpeed = 5;
    maxForce = 0.3;
    _wanderAngle = 0;
    DEBUG = DEBUG();

    /**
     * Creates a vehicle.
     * @param sketch p5 sketch
     * @param {*} x target X
     * @param {*} y target Y
     */
    constructor(sketch, x, y) {
        this.pos = sketch.createVector(sketch.random(WIDTH), sketch.random(HEIGHT));
        this.target = sketch.createVector(x, y);
        // this.vel = sketch.createVector();
        this.vel = p5.Vector.random2D();
        this.acc = sketch.createVector();
        this.sketch = sketch;
    }

    /**
     * Updates vehicle position.
     */
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.DEBUG = DEBUG();

        if(this.DEBUG){
             // render acceleration direction
             this.sketch.strokeWeight(1);
             this.sketch.stroke('red');
             let accelerationVector = this.getAccelerationVector(50);
             this.sketch.line(this.pos.x, this.pos.y, accelerationVector.x, accelerationVector.y);
        }

        this.acc.mult(0);
    }

    /**
     * Draws vehicle.
     * @param {*} sketch p5 sketch to show on.
     */
    show(color = 255) {
        
        if (this.DEBUG) {

            // render speed direction
            this.sketch.strokeWeight(1);
            this.sketch.stroke(255);
            let pointInfront = this.getPositionInFront(20);
            this.sketch.line(this.pos.x, this.pos.y, pointInfront.x, pointInfront.y);

            // render target
            this.sketch.stroke(100);
            this.sketch.strokeWeight(this.r);
            this.sketch.point(this.target.x, this.target.y);
        }

        this.sketch.stroke(color);
        this.sketch.strokeWeight(this.r);
        this.sketch.point(this.pos.x, this.pos.y);
    }

    /**
     * Accumulates behaviours.
     */
    behaviors(vehicles) {

        let mouse = this.sketch.createVector(this.sketch.mouseX, this.sketch.mouseY);
        let flee = this.flee(mouse, 35);
        let arrive = this.arrive(this.target);

        arrive.mult(1);
        flee.mult(3);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    /**
     * Applies seek behavior to the current target.
     */
    applySeekBehavior() {
        let seek = this.seek(this.target);
        this.applyForce(seek);
    }

    /**
     * Applies arrive behavior to the current target.
     */
    applyArriveBehavior() {
        let arrive = this.arrive(this.target);
        this.applyForce(arrive);
    }

    /**
     * Sets new target coordinates to the vehicle
     * @param {*} x X
     * @param {*} y Y
     */
    setTarget(x, y) {
        this.target = this.sketch.createVector(x, y);
    }

    /**
     * Apply force to acceleration.
     * @param {*} f force vector.
     */
    applyForce(f) {
        this.acc.add(f);
    }

    /**
     * Seek behaviour.
     */
    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    /**
     * Wander behaviour.
     */
    wander() {
        let radius = 50;
        let distance = 100;
        
        // calculate the circle position in <distance> pizels from the current position
        let circleCenter = this.getPositionInFront(distance);
        
        // need to pick up point on the circle with the radius
        // update angle every 100th frame
        const needUpdate = this.sketch.frameCount % 100;
        
        if(needUpdate === 0){
            this._wanderAngle = this.sketch.random(2 * Math.PI);
        }

        // calculate point on that angle that lays on circle
        let x = radius * this.sketch.sin(this._wanderAngle);
        let y = radius * this.sketch.cos(this._wanderAngle);
        let target = this.sketch.createVector(x, y);
        target.add(circleCenter);

        
        if(this.DEBUG){
            this.sketch.strokeWeight(1);
            this.sketch.stroke(100);
            this.sketch.noFill();
            this.sketch.circle(circleCenter.x, circleCenter.y, radius * 2);
            this.sketch.strokeWeight(8);
            this.sketch.stroke('red');
            this.sketch.point(target.x, target.y);
        }

        
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    /**
     * Applies wander behavior
     */
    applyWanderBehavior(magnitude = 1){
        let wander = this.wander();
        wander.setMag(magnitude);
        this.applyForce(wander);
    }

    /**
     * Flee (evade) behaviour.
     */
    flee(target, distance = 50) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        if (d < distance) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            return steer;
        }
        return this.sketch.createVector(0, 0);
    }

    /**
     * Applies flee away from x, y target behavior.
     * @param {*} x 
     * @param {*} y 
     * @param {*} distance 
     */
    applyFleeBehavior(x, y, distance = 50, magnitude = 1) {
        const target = this.sketch.createVector(x, y);
        let flee = this.flee(target, distance);
        flee.setMag(magnitude);
        this.applyForce(flee);
    }

    /**
     * Seek behaviour.
     */
    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);

        const d = desired.mag();
        let speed = this.maxSpeed;
        if (d < 100) {
            speed = this.sketch.map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    /**
     * Separation. Method checks for nearby vehicles and steers away.
     * @param {*} vehicles 
     */
    separate(vehicles, distance) {
        let desiredseparation = distance || this.r * 2;
        let sum = new p5.Vector();
        let count = 0;
        // For every boid in the system, check if it's too close
        vehicles.forEach(other => {
            let d = p5.Vector.dist(this.pos, other.pos);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.normalize();
                diff.div(d);        // Weight by distance
                sum.add(diff);
                count++;            // Keep track of how many
            }
        });
        // Average -- divide by how many
        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxSpeed);
            // Implement Reynolds: Steering = Desired - Velocity
            sum.sub(this.vel);
            sum.limit(this.maxForce);
        }
        return sum;
    };

    /**
     * Apply separate behavior from other vehicles.
     * @param {*} vehicles 
     */
    applySeparateBehavior(vehicles, options = {}) {
        let separate = this.separate(vehicles, options.distance);
        if (options.magnitude) {
            separate.setMag(options.magnitude);
        }
        this.applyForce(separate);
    }

    /**
     * Returns the vector behind the vehicle based on velocity and given distance.
     * @param {*} distance Distance.
     */
    getPositionBehind(distance = 20){
        const followingTarget = this.pos.copy();
        followingTarget.add(this.vel.copy().mult(distance).mult(-1));
        return followingTarget;
    }

    /**
     * Returns the vector in front the vehicle based on velocity and given distance.
     * @param {*} distance Distance.
     */
    getPositionInFront(distance = 20){
        const followingTarget = this.pos.copy();
        followingTarget.add(this.vel.copy().mult(distance));
        return followingTarget;
    }

    /**
     * Returns the vector indicating the acceleration
     * @param {*} distance Distance.
     */
    getAccelerationVector(distance = 20){
        const followingTarget = this.pos.copy();
        followingTarget.add(this.acc.copy().mult(distance));
        return followingTarget;
    }
}

export default Vehicle;