'use strict';
let Global;

function setup() {
    Global = new Tetris();
    Global.init();
    createCanvas(Global.width, Global.height);
    frameRate(Global.frameRate);
}

function draw() {
    background(Global.backgroundColour);
    Global.frameInc = Global.frameInc + 1;
    Global.drawGrid();

    if (Global.frameInc % (60 / Global.speedDivider) === 0) {
        if (!Global.pause) {
            Global.shape.moveY();
        }
    }

    Global.flash();
    Global.show(); // display the shape and the shapes that have landed
}
