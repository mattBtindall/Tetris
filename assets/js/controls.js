'use strict';

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            Global.shape.rotate();
            break;
        case DOWN_ARROW:
            Global.shape.speedDownwards();
            break;
        case RIGHT_ARROW:
            Global.shape.moveXHandler('collideRight', Global.scl, 'right');
            break;
        case LEFT_ARROW:
            Global.shape.moveXHandler('collideLeft', -Global.scl, 'left');
            break;
        case 32: // spacebar
            Global.shape.slam();
            break;
        case 80: // the letter 'p'
            Global.togglePause();
            break;
    }
    // return false; // blocks other keyboard shortcuts
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        Global.arrowPressedFlags.right = false;
    } else if (keyCode === LEFT_ARROW) {
        Global.arrowPressedFlags.left = false;
    } else if (keyCode === DOWN_ARROW) {
        Global.setSpeed();
        Global.shape.speedMovingDownwards = false;
    }
    return false;
}

/** for mobiles */

function mouseDragged() {
    Global.touchControl.trackDragX();
    Global.touchControl.trackDragY();
    return false;
}

function mousePressed() {
    Global.shape.clickRotate();
    return false;
}

function mouseReleased() {
    Global.touchControl.init();
    if (Global.shape.speedMovingDownwards) {
        Global.shape.speedMovingDownwards = false;
        Global.setSpeed();
    }
    return false;
}
