<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import Field from "../phisics/field";
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";

    let leaderTargetTimer;

    const s = (sketch) => {
        let field;
        let vehicles = [];

        sketch.preload = () => {
            field = new Field(sketch);

            vehicles.push(new Vehicle(sketch, WIDTH / 2, HEIGHT / 2));
            vehicles.push(new Vehicle(sketch, WIDTH / 2, HEIGHT / 2));
            vehicles.push(new Vehicle(sketch, WIDTH / 2, HEIGHT / 2));
            vehicles.push(new Vehicle(sketch, WIDTH / 2, HEIGHT / 2));
            vehicles.push(new Vehicle(sketch, WIDTH / 2, HEIGHT / 2));
            vehicles.forEach((v) => {
                v.setTarget(sketch.random(WIDTH), sketch.random(HEIGHT));
            });

            vehicles.forEach((v) => {
                v.maxForce = 0.5;
                v.maxSpeed = 1;
                v.r = 12;
            });

            // start timer to randomly update target of the vehicle
            leaderTargetTimer = setInterval(() => {
                vehicles.forEach((v) => {
                    v.setTarget(sketch.random(WIDTH), sketch.random(HEIGHT));
                });
            }, 10000);
        };

        sketch.setup = () => {
            sketch.createCanvas(WIDTH, HEIGHT);
        };

        sketch.draw = () => {
            sketch.clear();
            sketch.background(51);

            // show force fields
            field.update();
            field.show();

            // show vehicles
            for (let i = 0; i < vehicles.length; i++) {
                const vehicle = vehicles[i];
                vehicle.applySeekBehavior();
                vehicle.applyFieldReactBehavior(field);
                vehicle.applySeparateBehavior(vehicles, {
                    magnitude: 0.5,
                });

                vehicle.update();
                vehicle.show();
            }

            drawFrameRate(sketch);
        };
    };

    onMount(() => {
        let mp5 = new p5(s, document.getElementById("mainCanvas"));
        return () => {
            mp5.remove();
            clearInterval(leaderTargetTimer);
        };
    });
</script>

<div>
    <main id="mainCanvas" />
</div>

<hr />

<p>
    The field simulates an unstable envoriment, similar to wind in the open air.
    The vehicle or a dron is trying to either stay on place or to "arrive" to a
    new target point.
</p>

<p>
    The firld adds the force vector to the vehicle trying to move it along the
    wind direction and force. Wind force is also changing randomly.
</p>

<p>Random fluctuations are implemented as perlin noise.</p>
