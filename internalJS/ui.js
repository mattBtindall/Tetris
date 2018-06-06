"use strict";

function setup()
{
    createCanvas( canvasWidth, canvasHeight);
    frameRate(5);
    preloadFonts();
    shape = new Shape('cube');
}

function preloadFonts() 
{
    loadFont('/fonts/VT323.ttf');
}

function draw()
{
    background('#ccc');
    gridLines();
    shape.update();
    shape.show();
    shape.getCoordinates();
    shape.hitBottom();
    shape.hitCube();
    //shape.shapeCollide();
    shape.isMoved();
    shape.setPrevCoordinates();
    pauseText();

    // globalCubes.forEach((cube) => cube.show());
    globalCubes.forEach((cube) => {
        //cube.drawTest();
        cube.show()
    });

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
    if (paused) {
        textSize(75);
        fill(240, 240, 240);
        textFont('VT323');
        text('Paused', scl*1.5, scl*10);
        unpaused = true;
        let canvas = document.querySelector('#defaultCanvas0').style.filter = "grayscale(100%)";

        // -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        // filter: grayscale(100%);
        // canvas.style.filter = "grayscale(100%)";

    }
    else if (!paused && unpaused) {
        let i = 4;
        unpaused = false;
        let interval = setInterval(() => {
            if (i >= 2) {
                i--;
                console.log('yup');
                textSize(100);
                fill(240, 240, 240);
                text(i.toString(), ((canvasWidth/2)-scl), ((canvasHeight/2)-scl));
            } else if (i === 1) {
                clearInterval(interval);
                let canvas = document.querySelector('#defaultCanvas0').style.filter = "none";
                shape.pause( scl);
            }
        }, 1000);
    }
}

