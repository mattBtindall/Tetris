"use strict";

function Shape()
{
    this.x = sclW *3;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = sclH;
}

Shape.prototype.update = function()
{
    if (this)
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
}

// Shape.prototype.move = function()
// {
//     this.
// }
Shape.prototype.show = function()
{
    fill('#255');
    rect(this.x, this.y, sclW, sclH);
}