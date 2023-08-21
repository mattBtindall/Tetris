'use strict';
let Global;

function setup() {
    Global = new Tetris();
    Global.init();
}

function draw() {
    Global.everyFrame();
}
