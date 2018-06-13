"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    frameRate(5);
    preloadFonts();
    shape = new Shape('cube');
    //shape.getHighestCube();
}

function preloadFonts() 
{
    loadFont('/fonts/VT323.ttf');
}

function draw()
{
    background('#ccc');
    gridLines();
    shape.draw();

    globalCubes.forEach(cube => cube.show()); // Show all cubes at the bottom
    pauseText();
}

function gridLines()
{
    let gridIncW = scl;
    let gridIncH = scl;

    stroke('rgba(255,204,0,.65)');
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

// 

function pauseText()
{
    let canvas =  document.querySelector('#defaultCanvas0');
    if (paused) {
        mainFontStyle();
        text('Paused', scl, scl*10);
        unpaused = true;
        canvas.style.filter = "grayscale(100%) blur(.5px)";
        disableKeys = true;
    }
    else if (!paused && unpaused) {
        let i = 4;
        unpaused = false;
        let interval = setInterval(() => {
            if (i >= 2) {
                console.log(i);
                if (paused) { // check if paused is hit again
                    clearInterval(interval);
                } else {
                    i--;
                    mainFontStyle();
                    text(i.toString(), ((canvasWidth/2)-scl), ((canvasHeight/2)-scl));
                }
            } else if (i === 1) {
                clearInterval(interval);
                canvas.style.filter = "none";
                shape.pause( scl);
                disableKeys = false;
            }
        }, 1000);
    }
}

function mainFontStyle()
 {
    let fontSize = canvasWidth/3;
    textSize(fontSize);
    fill(240, 240, 240);
    textFont('VT323');
    stroke(51);
    strokeWeight(10);
}