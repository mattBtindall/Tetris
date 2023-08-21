'use strict';

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            Global.shape.rotate();
            break;
        case DOWN_ARROW:
            Global.speedDivider = 5;
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
    }
    return false;
}

/** for mobiles */

function mouseDragged() {
    // Global.shape.draggedX();
    Global.shape.draggedY();
    return false;
}

function mousePressed() {
    Global.shape.clickRotate();
    return false;
}

function mouseReleased() {
    console.log(Global.shape.dragY)
    Global.shape.dragX.distance = false;
    Global.shape.dragY.startPoint = false;
    Global.shape.dragY.distance = 0;
    Global.shape.dragY.movementPoints = [];
    Global.shape.dragY.slamMovementIndex = 0;
    Global.shape.dragY.speedUpMovementIndex = 0;
    if (!Global.shape.slammed) Global.setSpeed();
    return false;
}
