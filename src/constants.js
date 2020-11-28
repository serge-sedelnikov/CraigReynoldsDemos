let isDebug = true;
const height = 400;
const width = 640;


module.exports = {
    WIDTH: width,
    HEIGHT: height,
    DEBUG: () => {
        return isDebug;
    },
    setDebug: (newValue) => {
        isDebug = newValue
    },

    drawFrameRate: (sketch) => {
        if(isDebug){
            const fps = sketch.frameRate();
            sketch.fill(255);
            sketch.stroke(0);
            sketch.text("FPS: " + fps.toFixed(2), 10, height - 10);
        }
    }
}