"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    let s = new Shape();
    nodes.unshift(s);

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
    nodes[0].update(); // Update blocks position
    nodes[0].show(); // Show 'current' block
    for (let i = 1; i < nodes.length; i++) {
        nodes[i].show(); // Show blocks
    }
}

function hitTest() 
{
    if (nodes[0].y+sclH === canvasHeight) {
        console.log('hit')
        nodes[0].ySpeed = 0;
        nodes[0].hit = true;
    }
    for (let i = 1; i < nodes.length; i++) {
        console.log('loop');
        if (nodes[0].y === nodes[i].y && nodes[0].x === nodes[i].x) {
            console.log('hit')
            nodes[0].ySpeed = 0;
            nodes[0].hit = true;
        }
    }
}

function gridLines()
{
    let gridIncW = sclW;
    let gridIncH = sclH;

    stroke(255, 204, 0);
    strokeWeight(2);

    for (let i = 0; i < noRows; i++) {
        line(gridIncW, 0, gridIncW, canvasHeight);
        gridIncW+=sclW;
    }

    for(let i = 0; i < noCols; i++) {
        line(0, gridIncH, canvasWidth, gridIncH);
        gridIncH+=sclH;
    }
}

function spawn()
{
    // if (nodes[0].y+sclH === canvasHeight || nodes[0].y+sclH) {
    if (nodes[0].hit) {
        console.log('new shape');
        let s = new Shape();
        nodes.unshift(s);
    }
}