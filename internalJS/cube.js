"use strict";

function Cube( x, y, colour)
{
    this.x = x;
    this.y = y;
    this.xSpeed = 0;
    this.ySpeed = scl;

    this.move = true;
    this.hit = false;
    this.colour = getColour(colour, '1');
}

Cube.prototype.update = function()
{
    // this.x = this.x + this.xSpeed; 
    // this.y = this.y + this.ySpeed;
    this.x += this.xSpeed; 
    this.y += this.ySpeed;
}

Cube.prototype.show = function()
{
    fill(this.colour);
    strokeWeight(2);
    stroke(0);
    rect(this.x, this.y, scl, scl);
}

Cube.prototype.drawTest = function()
{
    stroke('yellow');
    strokeWeight(10);
    line(this.x,this.y,this.x,this.y);
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