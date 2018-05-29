"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    frameRate(10);
    shape = new Shape('cube');
    //shapes[0].getY();
}

function draw()
{
    background('#ccc');
    gridLines();
    shape.update();
    shape.show();
    shape.getCoordinates();
    shape.drawTest();
    shape.hitBottom();
    shape.hitCube();

    globalCubes.forEach((cube) => {
        cube.show();
        cube.drawTest();
    });
}

// function displayBlocks()
// {
//     spawn(); // Spawn new block 
//     cubes[0].update(); // Update blocks position
//     cubes[0].show(); // Show 'current' block
//     for (let i = 1; i < cubes.length; i++) {
//         cubes[i].show(); // Show blocks
//     }
// }

// function hitTest() 
// {
//     if (cubes[0].y+scl >= (canvasHeight-scl)) {
//         console.log('hit')
//         cubes[0].ySpeed = 0;
//         cubes[0].hit = true;
//     }
//     for (let i = 1; i < cubes.length; i++) {
//         console.log('loop');
//         if (cubes[0].x === cubes[i].x && cubes[0].y === cubes[i].y-scl) {
//             console.log('hit')
//             cubes[0].ySpeed = 0;
//             cubes[0].hit = true;
//         }
//     }
// }

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
    let min = 1,
        max = 7;
    do
    {  
        ranNum = getRandomInt(min, max);
        if (ranNum === prevranNum) {
            ranNum = getRandomInt(min ,max);
        }
    } while (ranNum === prevranNum);
    prevranNum = ranNum;
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

function getColour( colour, opac)
{
    let colTemp;
    switch (colour)
    {
        case 'red':
            colTemp = 'rgba(146, 43, 33,'+opac+')';
            break;
        case 'green':
            colTemp = 'rgba(35, 155, 86,'+opac+')';
            break;
        case 'blue':
            colTemp = 'rgba(40, 116, 166,'+opac+')';
            break;
        case 'yellow':
            colTemp = 'rgba(183, 149, 11,'+opac+')';
            break;
        case 'orange':
            colTemp = 'rgba(160, 64, 0,'+opac+')';
            break;
        case 'purple' : 
            colTemp = 'rgba(108, 52, 131,'+opac+')';
            break;
        case 'grey' :
            colTemp = 'rgba(236, 240, 241,'+opac+')';
            break;
        default:
            colTemp = 'rgba(0, 21, 45,'+opac+')';
    }
    return colTemp;
}