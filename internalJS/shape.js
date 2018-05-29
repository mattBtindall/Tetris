"use strict";

function Shape( shape)
{
    shapeNo++;

    this.shape = shape;
    this.cubes = [];
    this.colour = null;
    this.shapeNo = shapeNo;

    this.x = [];
    this.y = [];
    this.stopped = false;

    this.createSquare();
    this.getCoordinates();
}

Shape.prototype.createSquare = function()
{
    let xTemp = scl*5;
    let yTemp = -scl; 
    let x = [xTemp, xTemp+scl, xTemp, xTemp+scl];
    let y = [yTemp, yTemp, yTemp*2, yTemp*2];

    for (let i = 0; i < 4; i++) {
        this.cubes[i] = new Cube( x[i], y[i], 'red');
    }
}

Shape.prototype.show = function()
{
    for (let i = 0; i < this.cubes.length; i++) {
        this.cubes[i].show();
    }
}

Shape.prototype.update = function()
{
    for (let i = 0; i < this.cubes.length; i++) {
        this.cubes[i].update();
    }
}

Shape.prototype.getCoordinates = function()
{
    let yTemp = this.cubes.map((i) => i.y); // Create temporary array to hold y values 
    // for (let i = 0; i < cubes.length; i++) {
    //     if (yTemp.indexOf(this.cubes[i].y+scl) === -1) {
    //         this.x.push(cubes[i].x);
    //         this.y.push(cubes[i].y);
    //     }
    // }
    this.cubes.forEach(( obj, i) => {
        if (yTemp.indexOf(obj.y+scl) === -1) {
            this.x[i] = obj.x;
            this.y[i] = obj.y+scl;
        }
    });
}

Shape.prototype.drawTest = function()
{
    stroke('red');
    strokeWeight(10);
    for (let i = 0; i < this.y.length; i++) {
        line(this.x[i],this.y[i],this.x[i],this.y[i]);
    }
}

Shape.prototype.hitBottom = function()
{
    this.y.forEach((y) => { 
        if (y >= canvasHeight) {
            this.hit();
        }
    });
}

Shape.prototype.hitCube = function() 
{
    // for (let i = 0; i < this.cubes.length; i++) {
    //     for (let j = 0; j < globalCubes.length; j++) {
    //         if (this.cubes[i].x === globalCubes[j].x && this.cubes[i].y === globalCubes[j].y) {
    //             this.hit = true;
    //         }
    //     }
    // }
    this.cubes.forEach((cube) => { 
        globalCubes.forEach((cubes) => {
            if (cube.x === cubes.x && cube.y >= (cubes.y - scl)) {
                this.hit(); 
            }
        });
    });
}

Shape.prototype.hit = function()
{
    if (!this.stopped) {
        this.stopped = true;
        this.cubes.forEach((obj) => {
            obj.ySpeed = 0;
            globalCubes.push(obj);
        });
        if (this.y >= 0) {
            console.log('new shape');
            shape = new Shape('cube');
        }
    }
}