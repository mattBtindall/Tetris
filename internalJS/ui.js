"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    frameRate(7.5);
    let s = new Shape('cube');
    shapes.unshift(s);
}

function draw()
{
    background('#ccc');
    gridLines();
    shapes[0].update();
    shapes[0].show();
    //displayBlocks();
    //hitTest();
}

function displayBlocks()
{
    spawn(); // Spawn new block 
    cubes[0].update(); // Update blocks position
    cubes[0].show(); // Show 'current' block
    for (let i = 1; i < cubes.length; i++) {
        cubes[i].show(); // Show blocks
    }
}

function hitTest() 
{
    if (cubes[0].y+scl >= (canvasHeight-scl)) {
        console.log('hit')
        cubes[0].ySpeed = 0;
        cubes[0].hit = true;
    }
    for (let i = 1; i < cubes.length; i++) {
        console.log('loop');
        if (cubes[0].x === cubes[i].x && cubes[0].y === cubes[i].y-scl) {
            console.log('hit')
            cubes[0].ySpeed = 0;
            cubes[0].hit = true;
        }
    }
}

function gridLines()
{
    let gridIncW = scl;
    let gridIncH = scl;

    stroke(255, 204, 0);
    strokeWeight(2);

    for (let i = 0; i < noRows; i++) {
        line(gridIncW, 0, gridIncW, canvasHeight);
        gridIncW+=scl;
    }

    for(let i = 0; i < noCols; i++) {
        line(0, gridIncH, canvasWidth, gridIncH);
        gridIncH+=scl;
    }
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextShape() // Get next shape at random
{
    do 
    {  
        shapeNo = getRandomInt(1, 7);
        if (shapeNo === prevShapeNo) {
            shapeNo = getRandomInt(1 ,7);
        }
    } while (shapeNo === prevShapeNo);
    prevShapeNo = shapeNo;
}

// function spawn()
// {
//     // if (cubes[0].y+scl === canvasHeight || cubes[0].y+scl) {
//     if (cubes[0].hit) {
//         newShape();
//     } 
// }

// function newShape()
// {
//     let s = new Cube();
//     cubes.unshift(s);
// }