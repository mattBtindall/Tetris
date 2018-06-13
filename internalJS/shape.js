"use strict";

function Shape( shape)
{
    shapeNo++;

    this.shape = shape;
    this.cubes = [];
    this.silhouette = [];
    this.colour = null;
    this.shapeNo = shapeNo;
    this.stopped = false;

    this.x = [];
    this.y = [];
    this.lowerCubes = [];
    this.prevX = [];
    this.prevY = [];
    this.stopL = false;
    this.stopR = false;

    this.silhouetteY = [];
    // this.temp;
    // this.tempY;
    // this.tempX;
    //this.distance;

    //this.createSquare();
    this.createLine();
    this.getCoordinates();
    this.defaultsilhouette();
    this.getHighestCube();
}

Shape.prototype.createShape = function( x, y, colour)
{
    for (let i = 0; i < 4; i += 1) {
        this.cubes[i] = new Cube( x[i], y[i], colour);
    }
}

Shape.prototype.createSquare = function()
{
    let xTemp = scl*5;
    let yTemp = -scl; 
    let x = [xTemp, xTemp+scl, xTemp, xTemp+scl];
    let y = [yTemp, yTemp, yTemp*2, yTemp*2];
    this.createShape( x, y, 'red');
}

Shape.prototype.createLine = function()
{
    let xTemp = scl*5;
    let x = [xTemp,xTemp,xTemp,xTemp];
    let y = [-scl*4,-scl*3,-scl*2,-scl];
    this.createShape( x, y, 'yellow');
}

Shape.prototype.createLShape = function()
{
    
}

Shape.prototype.createJShape = function()
{

}

Shape.prototype.createTee = function()
{

}

Shape.prototype.createZShape = function()
{

}

Shape.prototype.createSShape = function()
{

}

Shape.prototype.defaultsilhouette = function()
{   
    this.cubes.forEach(( cube, i) => {
        console.log(cube.y + (canvasHeight - scl));
        this.silhouetteY[i] = cube.y + canvasHeight;
    });
}

Shape.prototype.show = function()
{
    this.cubes.forEach(( cube, i) => {
        cube.show();
        //this.silhouette[i].show();
    });
}

Shape.prototype.update = function()
{
    this.cubes.forEach(( cube) => {
        cube.update();
    });
}

Shape.prototype.getCoordinates = function()
{
    this.x = [];
    this.y = [];
    //let yTemp = this.cubes.map(( i) => i.y); // Create temporary array to hold y values 
    let yTemp = this.cubes.map( cube => cube.y);
    this.cubes.forEach(( obj, i) => {
        let roundedY = Math.round((obj.y + scl) * 100) / 100;
        if (yTemp.indexOf(roundedY) === -1) {
            this.x.push(Math.round(obj.x * 100) / 100);
            this.y.push(Math.round((obj.y+scl) * 100) / 100);
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
        if ((x - this.prevX[i]) > 0) { // Moved right 
            this.getHighestCube();
            if (this.spaceTestR()) {
                this.normalSpeedX();
            }
        }
        else if ((x - this.prevX[i]) < 0) { // Moved left
            this.getHighestCube();
            if (this.spaceTestL()) {
                this.normalSpeedX();
            }
        }
    });
}

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

Shape.prototype.draw = function()
{
    this.update();
    this.show();
    this.getCoordinates();
    this.hitBottom();
    this.hitCube();
    this.isMoved();
    this.setPrevCoordinates();
    this.drawTest();
    this.drawsilhouette();
}

// silhoutte

Shape.prototype.getHighestCube = function()
{
    console.log('called');
    let temp = null;
    
    this.x.forEach(( x, i) => {
        globalCubes.forEach(( gCube) => {
            if (x === gCube.x && temp === null) {
                temp = gCube;
            } else if (x === gCube.x && gCube.y < temp.y && this.y[i] < gCube.y) {
                temp = gCube;
                let distance = gCube.y - this.y[i];
                this.silhouetteY = this.cubes.map( cube => cube.y + distance);
            }
        });
    });
}

Shape.prototype.drawsilhouette = function()
{
    let c = 'rgba(255,0,0,.25)';
    stroke(c);
    fill(c);
    strokeWeight(1);
    this.cubes.forEach(( cube, i) => {
        rect(cube.x,this.silhouetteY[i],scl,scl);
    });
}

// Keyboard movements

Shape.prototype.moveR = function()
{
    this.spaceTestR();
    if (!this.stopR) {
        this.cubes.forEach((obj) => obj.moveR());
    }
}

Shape.prototype.moveL = function()
{
    this.spaceTestL(); 
    if (!this.stopL) {
        this.cubes.forEach( obj  => obj.moveL());
    }
}

Shape.prototype.moveDown = function()
{
    this.cubes.forEach( obj => obj.ySpeed = 2 * scl);
}

Shape.prototype.normalSpeedY = function()
{
    this.cubes.forEach( obj => obj.ySpeed = scl);
}

Shape.prototype.normalSpeedX = function()
{
    this.cubes.forEach( obj => obj.xSpeed = 0);
}

Shape.prototype.pause = function(i)
{
    this.cubes.forEach( cube => cube.ySpeed = i);
}