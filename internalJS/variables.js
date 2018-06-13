"use strict";

let globalCubes = [];
let shape; // Global shape object

// Canvas
let canvasHeight =  Math.round((window.innerHeight*.7) * 100) / 100,
    canvasWidth = Math.round((canvasHeight/2) * 100) / 100,
    noRows = 10,
    noCols = 20,
    scl = Math.round((canvasHeight / noCols) * 100) / 100;

let ranNum;
let prevRanNum;

let shapeNo = 0;
let gameOver = false;

let paused = false,
    unpaused = false;

let disableKeys = false;
