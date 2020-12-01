<script>
    import p5 from "p5";
    import { onMount } from "svelte";
    import Vehicle from "../phisics/vehicle";
    import Field from '../phisics/field';
    import { WIDTH, HEIGHT, drawFrameRate } from "../constants";

    const s = (sketch) => {

        const field = new Field(sketch);
       
        sketch.preload = () => {
            
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

            drawFrameRate(sketch);
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

<hr/>