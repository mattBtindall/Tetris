"use strict";

function keyPressed()
{
    if (keyCode === LEFT_ARROW) {
        //setInterval(nodes[0].moveL, 100);
        cubes[0].moveL();
    } else if (keyCode === RIGHT_ARROW) {
        cubes[0].moveR();
    } else if(keyCode === DOWN_ARROW) {
        cubes[0].ySpeed = 2 * scl;
    }
}

function keyReleased()
{
    if (keyCode === LEFT_ARROW) {
        cubes[0].xSpeed = 0;
    } else if (keyCode === RIGHT_ARROW) {
        cubes[0].xSpeed = 0;
    } else if(keyCode === DOWN_ARROW) {
        cubes[0].ySpeed = scl;
    }
}