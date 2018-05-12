"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    //newShape();
    frameRate(7.5);
}

function draw()
{
    background('#ccc');
    gridLines();
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