<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";

    let word = "ARRIVE";

    const s = (sketch) => {
        let font;
        let vehicles = [];

        sketch.preload = () => {
            font = sketch.loadFont("./fonts/Inconsolata-Regular.ttf");
        };

        sketch.setup = () => {
            sketch.createCanvas(WIDTH, HEIGHT);

            const points = font.textToPoints(word, 30, HEIGHT - 160, 192);
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                const vehicle = new Vehicle(sketch, p.x, p.y);
                vehicles.push(vehicle);
            }
        };

        sketch.draw = () => {
            sketch.clear();
            sketch.background(51);

            drawFrameRate(sketch);

            for (let i = 0; i < vehicles.length; i++) {
                const v = vehicles[i];
                v.behaviors(vehicles);
                v.update();
                v.show();
            }
        };
    };

    onMount(() => {
        let mp5 = new p5(s, document.getElementById("mainCanvas"));
        return () => {
            mp5.remove();
        };
    });
</script>

<div>
    <main id="mainCanvas" />
</div>
