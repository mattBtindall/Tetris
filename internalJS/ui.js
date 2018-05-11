"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    let s = new Shape();
    shapes.unshift(s);

    frameRate(7.5);
}

function draw()
{
    background('#ccc');
    gridLines();
    displayBlocks();
    hitTest();
}

function displayBlocks()
{
    spawn(); // Spawn new block 
    shapes[0].update(); // Update blocks position
    shapes[0].show(); // Show 'current' block
    for (let i = 1; i < shapes.length; i++) {
        shapes[i].show(); // Show blocks
    }
}

function hitTest() 
{
    if (shapes[0].y+scl === canvasHeight) {
        console.log('hit')
        shapes[0].ySpeed = 0;
        shapes[0].hit = true;
    }
    for (let i = 1; i < shapes.length; i++) {
        console.log('loop');
        if (shapes[0].x === shapes[i].x && shapes[0].y === shapes[i].y-scl) {
            console.log('hit')
            shapes[0].ySpeed = 0;
            shapes[0].hit = true;
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

function spawn()
{
    // if (shapes[0].y+scl === canvasHeight || shapes[0].y+scl) {
    if (shapes[0].hit) {
        console.log('new shape');
        let s = new Shape();
        shapes.unshift(s);
    }
}