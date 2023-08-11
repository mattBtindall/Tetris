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
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        Global.arrowPressedFlags.right = false;
    } else if (keyCode === LEFT_ARROW) {
        Global.arrowPressedFlags.left = false;
    } else if (keyCode === DOWN_ARROW) {
        Global.setSpeed();
    }
}

/** for mobiles */

// basis here:
// first click - record the users mouseX position
// track the distance between the start postion and the current position everytime it is dragged
// round this number the closest 5 - if you don't do this, sometimes the mouse data can skip numbers
// (if numbers are missed, it may miss the multiple in which the shape is suppose to move)
// everytime the distance is equal to 45 (this is a multiple of Global.scl found through trial and error, the rounding to 5 [and not ten] was used due to this)
// move the shape by Global.scl
// when the user drags fast, the distance can be multiple 45, the shape is moved based on the number of multiples
let drag = false
let dragMove = {
    method: null,
    multiplier: 0
}
function mouseDragged() {
    if (drag === false) {
        drag = mouseX
    }

    const distance = Math.ceil((mouseX - drag) / 10) * 10;
    if (distance && distance % 40 === 0) {
        dragMove.method = distance < 0 ? 'moveSingleLeft' : 'moveSingleRight'
        dragMove.multiplier += Math.abs(distance / 40)
        drag = mouseX
    }

    return false;
}

function mouseReleased() {
    drag = false
}