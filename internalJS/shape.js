"use strict";

function Shape()
{
    this.x = sclW *3;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = sclH;
    this.move = true;
    this.hit = false;
}

// Shape.prototype.update = function()
// {
//     this.x = this.x + this.xSpeed;
//     this.y = this.y + this.ySpeed;
// }

Shape.prototype.update = function()
{
    this.x = this.x + this.xSpeed; 
    //if ((this.y+sclH) < canvasHeight) {
    this.y = this.y + this.ySpeed;
    //}
}

Shape.prototype.show = function()
{
    fill('#255');
    rect(this.x, this.y, sclW, sclH);
}

Shape.prototype.moveL = function()
{
    console.log('move called');
    if ((this.x + sclW) === canvasWidth || this.x != 0) {
        console.log('move left');
        this.xSpeed = -sclW;
    }
}

Shape.prototype.moveR = function()
{
    if (this.x === 0 || (this.x + sclW) != canvasWidth) {
        console.log('move right');
        this.xSpeed = sclW;
    }
}