"use strict";

function Shape( shape)
{
    this.shape = shape;
    this.cubes = [];
    this.createCube();
    this.x;
    this.y;
    this.getCoordinates();
}

Shape.prototype.createCube = function()
{
    let xTemp = scl*5;
    let yTemp = -scl; 
    let x = [xTemp, xTemp+scl, xTemp, xTemp+scl];
    let y = [yTemp, yTemp, yTemp*2, yTemp*2];

    for (let i = 0; i < NO_CUBES; i++) {
        this.cubes[i] = new Cube( x[i], y[i]);
        cubes.push(this.cubes[i])
    }
}

Shape.prototype.show = function()
{
    for (let i = 0; i < NO_CUBES; i++) {
        this.cubes[i].show();
    }
}

Shape.prototype.update = function()
{
    for (let i = 0; i < NO_CUBES; i++) {
        this.cubes[i].update();
    }
}

Shape.prototype.getCoordinates = function()
{
    this.getX();
    this.getY();
}

Shape.prototype.getX = function()
{
    let xTemp = this.cubes.map((i) => i.x); // Create temporary array to hold x values 
    this.x = xTemp.filter((val) => { // get x values that have nothing beneath them
        return xTemp.indexOf(val+scl) === -1; // if = -1 then the value is not in the array
    });
}

Shape.prototype.getY = function()
{
    
}


Shape.prototype.hitBottom = function()
{

}