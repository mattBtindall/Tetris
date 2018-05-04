"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    s = new Shape();
}

function draw()
{
    background('#ccc');
    gridLines();

    s.update();
    s.show();
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