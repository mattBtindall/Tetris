"use strict";

function Shape( s)
{
    shapeNo++;

    //this.shape = shape;
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

    this.getRandomShape();
    this.getCoordinates();
    this.defaultsilhouette();
    this.getHighestCube();
}

Shape.prototype.getRandomShape = function( )
{
    ranNo();
    console.log(ranNum);
    switch (ranNum)
    {
        case 0 :
            this.createSquare();
            break;
        case 1 :
            this.createLine();
            break;
        case 2 : 
            this.createTee();
            break;
        case 3 : 
            this.createLShape();
            break;
        case 4 : 
            this.createJShape();
            break;
        case 5 : 
            this.createSShape();
            break;
        case 6 :
            this.createZShape();
            break;
    }
}

Shape.prototype.createShape = function( x, y, colour)
{
    for (let i = 0; i < 4; i += 1) {
        this.cubes[i] = new Cube( x[i], y[i], colour);
    }
}

// Create Different Shapes
// For all shapes the starting point (top left box from diagram) = scl*4
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
    let xTemp = scl*4;
    let x = [xTemp,xTemp,xTemp,xTemp];
    let y = [-scl*4,-scl*3,-scl*2,-scl];
    this.createShape( x, y, 'yellow');
}

Shape.prototype.createLShape = function()
{
    let xTemp = scl*5;
    let x = [xTemp-scl,xTemp,xTemp,xTemp];
    let y = [-scl*3,-scl*3,-scl*2,-scl];
    this.createShape( x, y, 'darkBlue');
}

Shape.prototype.createJShape = function()
{
    let xTemp = scl*5;
    let x = [xTemp,xTemp+scl,xTemp,xTemp];
    let y = [-scl*3,-scl*3,-scl*2,-scl];
    this.createShape( x, y, 'lightBlue');
}

Shape.prototype.createTee = function()
{
    let xTemp = scl*4;
    let x = [xTemp,xTemp+scl,xTemp+scl,xTemp+(scl*2)];
    let y = [-scl,-scl*2,-scl,-scl];
    this.createShape( x, y, 'purple');
}

Shape.prototype.createZShape = function()
{
    let x = [scl*4,scl*5,scl*5,scl*6];
    let y = [-scl*2,-scl*2,-scl,-scl];
    this.createShape( x, y, 'darkGreen');
}

Shape.prototype.createSShape = function()
{
    let x = [scl*4,scl*5,scl*5,scl*6];
    let y = [-scl,-scl,-scl*2,-scl*2];
    this.createShape( x, y, 'lightGreen');
}

Shape.prototype.defaultsilhouette = function()
{   
    this.cubes.forEach(( cube, i) => {
        this.silhouetteY[i] = cube.y + canvasHeight;
    });
}

Shape.prototype.show = function()
{
    this.cubes.forEach(( cube, i) => {
        cube.show();
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
    let xTemp = this.cubes.map( cube => cube.x);
    // this.cubes.forEach(( obj, i) => {
    //     let roundedY = Math.round((obj.y + scl) * 100) / 100;
    //     if (yTemp.indexOf(roundedY) === -1) {
    //         this.x.push(Math.round(obj.x * 100) / 100);
    //         this.y.push(Math.round((obj.y+scl) * 100) / 100);
    //     }
    // });
    this.cubes.forEach( cube => {
        let roundedY = Math.round((cube.y + scl) * 100) / 100;       
        if (countInArray(xTemp, cube.x) === 1 || yTemp.indexOf(roundedY) === -1) { // Shape on own or Shape at bottom
            this.x.push(Math.round(cube.x * 100) / 100);
            this.y.push(Math.round((cube.y+scl) * 100) / 100);
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
        //this.getRandomShape( ranNo());
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
    this.x.forEach(( cubeX, i) => {
        globalCubes.forEach(( gCube) => {
            if (cubeX === gCube.x && temp === null) {
                temp = gCube;
            } else if (cubeX === gCube.x && gCube.y < temp.y) {
                temp = gCube;
                let distance = temp.y - this.y[i];
                this.silhouetteY = this.cubes.map( cube => cube.y + distance);
            }
        });
    });
}

Shape.prototype.drawsilhouette = function()
{
    let c = 'rgba(240,0,0,.35)';
    //stroke(c);
    fill(c);
    //strokeWeight(1);
    stroke('#ccc');
    strokeWeight(.5);
    this.cubes.forEach(( cube, i) => {
        rect(cube.x,this.silhouetteY[i],scl,scl,5);
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