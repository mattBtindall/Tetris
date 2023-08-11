'use strict';
let Global;

function setup() {
    Global = new Tetris();
    Global.init();
}

let dragMovementFrameCount = 0
function draw() {
    Global.everyFrame();
}
