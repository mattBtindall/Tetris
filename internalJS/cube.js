"use strict";

function Cube( x, y)
{
    this.x = scl *3;
    this.y = -scl;
    this.xSpeed = 0;
    this.ySpeed = scl;
    this.move = true;
    this.hit = false;
}

Cube.prototype.update = function()
{
    this.x = this.x + this.xSpeed; 
    this.y = this.y + this.ySpeed;
}

Cube.prototype.show = function()
{
    fill('#255');
    rect(this.x, this.y, scl, scl);
}

Cube.prototype.moveL = function()
{
    console.log('move called');
    if ((this.x + scl) === canvasWidth || this.x != 0) {
        console.log('move left');
        this.xSpeed = -scl;
    } 
}

Cube.prototype.moveR = function()
{
    if (this.x === 0 || (this.x + scl) != canvasWidth) {
        console.log('move right');
        this.xSpeed = scl;
    }
}