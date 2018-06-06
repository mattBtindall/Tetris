"use strict";

let globalCubes = [];
let shape; // Global shape object

// Canvas
let canvasHeight =  window.innerHeight*.7,
    canvasWidth = canvasHeight/2,
    noRows = 10,
    noCols = 20,
    scl = canvasHeight / noCols;

let ranNum;
let prevRanNum;

let shapeNo = 0;
let gameOver = false;

let paused = false,
    unpaused = false;
