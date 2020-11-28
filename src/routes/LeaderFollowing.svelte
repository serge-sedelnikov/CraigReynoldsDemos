<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";

    let followPattern = 1;
    let vehicleColor = () => {
        return 255;
    }

    // leader vehicle wandering around
    let leaderTargetTimer;

    const s = (sketch) => {
        let leaderVehicle;
        let followers = [];

        sketch.preload = () => {
            const maxForce = 0.04;
            const maxSpeed = 1.3;

            // create leader vehicle
            leaderVehicle = new Vehicle(sketch, WIDTH / 2, HEIGHT / 2);
            leaderVehicle.maxForce = maxForce;
            leaderVehicle.maxSpeed = maxSpeed;
            leaderVehicle.r = 12;

            // create follower vehicles
            for (let i = 0; i < 10; i++) {
                const v = new Vehicle(sketch, WIDTH / 2, HEIGHT / 2);
                v.maxForce = maxForce * 5;
                v.maxSpeed = maxSpeed * 1.5;
                followers.push(v);
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

        sketch.setup = () => {
            sketch.createCanvas(WIDTH, HEIGHT);
        };

        sketch.draw = () => {
            sketch.clear();
            sketch.background(51);

            drawFrameRate(sketch);
            
            leaderVehicle.applySeekBehavior();
           

            // need to prevent leader from movign away from screen,
            // flee from the canvas edges
            leaderVehicle.applyFleeBehavior(0, leaderVehicle.target.y, 5);
            leaderVehicle.applyFleeBehavior(WIDTH, leaderVehicle.target.y, 5);
            leaderVehicle.applyFleeBehavior(leaderVehicle.target.x, 0, 5);
            leaderVehicle.applyFleeBehavior(leaderVehicle.target.x, HEIGHT, 5);
            

            leaderVehicle.update();
            leaderVehicle.show("purple");

            // apply target for all follower vehicles
            for (let i = 0; i < followers.length; i++) {
                const vehicle = followers[i];

                // follow one leader
                if (followPattern === 1) {
                    // followers must point to the position a bit after the leader
                    const followingTarget = leaderVehicle.getPositionBehind();
                    vehicle.setTarget(followingTarget.x, followingTarget.y);
                }
                // follow previous vehicle
                else {
                    const targetVehicle = i === 0 ? leaderVehicle : followers[i - 1];
                    const followingTarget = targetVehicle.getPositionBehind(10);
                    vehicle.setTarget(followingTarget.x, followingTarget.y);
                }

                vehicle.applySeparateBehavior([...followers, leaderVehicle], {
                    distance: 16,
                    magnitude: 0.24
                });
                vehicle.applyArriveBehavior();
                vehicle.update();
                vehicle.show(vehicleColor());
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

<label>
    <input type="radio" bind:group={followPattern} value={1} />
    Follow leader
</label>
<label class="ml-3">
    <input type="radio" bind:group={followPattern} value={2} />
    Follow each other
</label>

<div >
    <main id="mainCanvas" />
</div>
