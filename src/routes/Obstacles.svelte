<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import Obstacle from "../phisics/obstacle";
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";

    // leader vehicle wandering around
    let leaderTargetTimer;

    const s = (sketch) => {
        let leaderVehicle;
        let obstacles = [];

        sketch.preload = () => {
            const maxForce = 0.04;
            const maxSpeed = 1.3;

            // create leader vehicle
            leaderVehicle = new Vehicle(sketch, WIDTH / 2, HEIGHT / 2);
            leaderVehicle.maxForce = maxForce;
            leaderVehicle.maxSpeed = maxSpeed;
            leaderVehicle.r = 12;

            // create obstacles
            for(let i = 0; i < 4; i++){
                addRandomObstacle();
            }

            // start timer to randomly update target of the vehicle
            leaderTargetTimer = setInterval(() => {
                if (!leaderVehicle) {
                    return;
                }
                leaderVehicle.setTarget(
                    sketch.random(WIDTH),
                    sketch.random(HEIGHT)
                );
            }, 3000);
        };

        /**
         * Adds random obstacle.
         */
        const addRandomObstacle = (x, y) => {
            const resX = sketch.ceil(x || sketch.random(WIDTH));
            const resY = sketch.ceil(y || sketch.random(HEIGHT));
            const r = sketch.ceil(sketch.random(10, 40));
            const o = new Obstacle(sketch, resX, resY, r);
            obstacles.push(o);
        }

        sketch.mouseClicked = () => {
            addRandomObstacle(sketch.mouseX, sketch.mouseY);
        }

        sketch.setup = () => {
            sketch.createCanvas(WIDTH, HEIGHT);
        };

        sketch.draw = () => {
            sketch.clear();
            sketch.background(51);

            drawFrameRate(sketch);

            

            // need to prevent leader from movign away from screen,
            // flee from the canvas edges
            leaderVehicle.applyFleeBehavior(0, leaderVehicle.target.y, 5);
            leaderVehicle.applyFleeBehavior(WIDTH, leaderVehicle.target.y, 5);
            leaderVehicle.applyFleeBehavior(leaderVehicle.target.x, 0, 5);
            leaderVehicle.applyFleeBehavior(leaderVehicle.target.x, HEIGHT, 5);

            leaderVehicle.update();
            leaderVehicle.show("purple");
            leaderVehicle.showFuturePositionRect();

            // apply force to avoid obstacles
            leaderVehicle.applyAvoidObstaclesBehavior(obstacles, {
                magnitude: 0.06
            });

            leaderVehicle.applySeekBehavior();

            // draw obstacles
            for(let i = 0; i<obstacles.length; i++){
                const o = obstacles[i];
                o.show();
            }
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

Click mouse left button to create an obstacle 🖱️