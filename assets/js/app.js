'use strict';
let Global;

function setup() {
    Global = new Tetris();
    Global.init();
}

let dragMovementFrameCount = 0
function draw() {
    Global.everyFrame();

    // slow down the movements of the cube when the user drags
    // if the shape movements are performed when the users drags fast
    // the shape jumps about - this is becuase when moving fast the shape can jump 5+ Global.scl at a time
    // the drag pressed function seems to track faster than draw does so this causes the shape to jump
    // this functions slow it down to 30 frames a second (every other frame)
    if (dragMove.multiplier) {
        if (dragMovementFrameCount % 2 === 0) {
            Global.shape[dragMove.method]()
            dragMove.multiplier--
        }
        dragMovementFrameCount++
    }
}
