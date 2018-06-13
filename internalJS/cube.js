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
    
    this.x = Math.round(this.x * 100) / 100;
    this.y = Math.round(this.y * 100) / 100;
}

Cube.prototype.show = function()
{
    fill(this.colour);
    strokeWeight(2);
    noStroke();
    rect(this.x, this.y, scl, scl);
}

Cube.prototype.drawTest = function()
{
    stroke('yellow');
    strokeWeight(15);
    line(this.x,this.y,this.x,this.y);
}

Cube.prototype.moveL = function()
{
    if ((this.x + scl) === canvasWidth || this.x != 0) {
        this.xSpeed = -scl;
    } 
}

Cube.prototype.moveR = function()
{
    if (this.x === 0 || (this.x + scl) != canvasWidth) {
        this.xSpeed = scl;
    }
}

// Cube.prototype.collide = function()
// {
//     if (this.x <= 0 || this.x >= canvasWidth - scl)
//         return true;
//     else 
//         return false;
// }

Cube.prototype.collideL = function() 
{
    for (let i = 0; i < globalCubes.length; i++) {
        if (this.x <= 0 || this.x === globalCubes[i].x + scl && this.y === globalCubes[i].y) {
            console.log('dont do it mister please');
            return true;
        }
    }
    return false;
}

Cube.prototype.collideR = function() 
{
    for (let i = 0;i < globalCubes.length; i++) {
        if (this.x >= canvasWidth -scl || this.x + scl === globalCubes[i].x && this.y === globalCubes[i].y) {
            console.log('dont do it mister please');
            return true;
        } 
    }
    return false;
}