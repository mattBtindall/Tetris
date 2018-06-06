"use strict";

function keyPressed()
{
    if (keyCode === LEFT_ARROW) {
        //setInterval(nodes[0].moveL, 100);
        shape.moveL();
    } else if (keyCode === RIGHT_ARROW) {
        shape.moveR();
    } else if(keyCode === DOWN_ARROW) {
        shape.moveDown();
    }

    if (keyCode === 80) {
        if (!paused) {
            shape.pause( 0);
            paused = true;
        } else {
            paused = false;
        }
    }
}

function keyReleased()
{
    if (keyCode === LEFT_ARROW) {
        shape.normalSpeedX();
    } else if (keyCode === RIGHT_ARROW) {
        shape.normalSpeedX();
    } else if(keyCode === DOWN_ARROW) {
        shape.normalSpeedY();
    }
}