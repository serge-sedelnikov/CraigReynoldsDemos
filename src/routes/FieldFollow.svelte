<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import Field from "../phisics/field";
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";
    import Markdown from "../Markdown.svelte";

    let leaderTargetTimer;
    let arriveTarget = true;

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
                v.maxSpeed = 2;
                v.r = 12;
            });

            // start timer to randomly update target of the vehicle
            leaderTargetTimer = setInterval(() => {
                vehicles.forEach((v) => {
                    if (arriveTarget) {
                        v.setTarget(
                            sketch.random(WIDTH),
                            sketch.random(HEIGHT)
                        );
                    }
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
                vehicle.applyArriveBehavior();
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

<label class="mt-4">
    <input type="radio" bind:group={arriveTarget} value={true} />
    Change target every 10 seconds
</label>
<label class="ml-3">
    <input type="radio" bind:group={arriveTarget} value={false} />
    Keep current  target position
</label>

<hr />

<Markdown file="/docs/Field.md" />
