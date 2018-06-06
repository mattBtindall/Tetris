"use strict";

function Shape( shape)
{
    shapeNo++;

    this.shape = shape;
    this.cubes = [];
    this.colour = null;
    this.shapeNo = shapeNo;
    //this.collided = false;
    this.stopped = false;

    this.x = [];
    this.y = [];
    this.prevX = [];
    this.prevY = [];
    this.stopL = false;
    this.stopR = false;

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
            // this.x[i] = obj.x;
            // this.y[i] = obj.y+scl;
            this.x[i] = Math.round(obj.x * 100) / 100;
            this.y[i] = Math.round((obj.y+scl) * 100) / 100;
            // this.x[i] = Math.round(this.x[i] * 100) / 100;
            // this.y[i] = Math.round(this.y[i] * 100) / 100;
        }
    });
}

Shape.prototype.setPrevCoordinates = function() 
{
    this.cubes.forEach((obj, i) => {
        this.prevX[i] = this.x[i];
        this.prevY[i] = this.y[i];
    });
}

Shape.prototype.isMoved = function()
{
    this.x.forEach(( x, i) => {
        if ((x - this.prevX[i]) > 0) {
            if (this.spaceTestR()) {
                this.normalSpeedX();
            }
        }
        else if ((x - this.prevX[i]) < 0) {
            if (this.spaceTestL()) {
                this.normalSpeedX();
            }
        }
        for (let i = 0; i < this.x.length; i++) {
            
        }
    });
}

// Shape.prototype.constrict = function()
// {
//     for (let i = 0; i < this.cubes.length; i++) { // Test for edges
//         if (this.cubes[i].collide()) {
//             console.log('stop');
//             this.normalSpeedX();
//             return this.stopX = true;
//         }
//     }
//     return this.stopX = false;
// }

// Shape.prototype.spaceTest = function()
// {
//     // check direction
//     // check if the space next is free
//     for (let j = 0; j < this.cubes.length; j++) {
//         for (let i = 0; i < globalCubes.length; i++) { // Test for edges
//             if (this.cubes[j].x + scl === globalCubes[i].x && this.cubes[j].y === globalCubes[i].y) {
//                 this.stopX = true;
//             }
//         }
//     }
// }

Shape.prototype.spaceTestL = function()
{
    for (let i = 0; i < this.cubes.length; i++) {
        if (this.cubes[i].collideL()) {
            return this.stopL = true;
        }
    }
    return this.stopL = false;
}

Shape.prototype.spaceTestR = function()
{
    for (let i = 0; i < this.cubes.length; i++) {
        if (this.cubes[i].collideR()) {
            return this.stopR = true;
        }
    }
    return this.stopR = false;
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
    for (let i = 0; i < this.x.length; i++) {
        for (let j = 0; j < globalCubes.length; j++) {
            if (this.x[i] === globalCubes[j].x && this.y[i] === globalCubes[j].y) {
                this.hit();
            }
        }
    }
}

Shape.prototype.hit = function()
{
    if (!this.stopped) { // Stops shape
        this.stopped = true;
        this.cubes.forEach((obj) => {
            obj.ySpeed = 0;
            globalCubes.unshift(obj);
        });
    }

    for (let i = 0; i < this.cubes.length; i++) {
        if (globalCubes[i].y <= 0) {
            // Call game over message
            console.log('game over');
            gameOver = true;
            break;
        }
    }
    if (!gameOver) {
        shape = new Shape('cube');
    }
}

// Shape.prototype.shapeCollide = function()
// {
//     this.cubes.forEach((obj) => {
//         if (obj.collide()) {
//             this.collided = true;
//         } else {
//             this.collided = false;
//         }
//     });
// }

// Keyboard movements

Shape.prototype.moveR = function()
{
    //this.constrict();
    this.spaceTestR();
    if (!this.stopR) {
        this.cubes.forEach((obj) => obj.moveR());
    }
}

Shape.prototype.moveL = function()
{
    //this.constrict();
    this.spaceTestL();  
    if (!this.stopL) {
        this.cubes.forEach((obj) => obj.moveL());
    }
}

Shape.prototype.moveDown = function()
{
    this.cubes.forEach((obj) => obj.ySpeed = 2 * scl);
}

Shape.prototype.normalSpeedY = function()
{
    this.cubes.forEach((obj) => obj.ySpeed = scl);
}

Shape.prototype.normalSpeedX = function()
{
    this.cubes.forEach((obj) => obj.xSpeed = 0);
}

Shape.prototype.pause = function(i)
{
    this.cubes.forEach((cube) => cube.ySpeed = i);
}