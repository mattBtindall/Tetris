"use strict";

function keyPressed()
{
    if (keyCode === LEFT_ARROW) {
        setInterval(nodes[0].moveL, 100);
        //nodes[0].moveL();
    } else if (keyCode === RIGHT_ARROW) {
        nodes[0].moveR();
    } else if(keyCode === DOWN_ARROW) {
        nodes[0].ySpeed = 2 * sclH;
    }
}

function keyReleased()
{
    if (keyCode === LEFT_ARROW) {
        nodes[0].xSpeed = 0;
    } else if (keyCode === RIGHT_ARROW) {
        nodes[0].xSpeed = 0;
    } else if(keyCode === DOWN_ARROW) {
        nodes[0].ySpeed = sclH;
    }
}

