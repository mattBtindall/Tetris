"use strict";

let cubes = [];
let shapes = [];
const NO_CUBES = 4;

let canvasHeight =  window.innerHeight*.7;
let canvasWidth = canvasHeight/2;

let noRows = 10;
let noCols = 20;

let scl = canvasHeight / noCols;

let shapeNo;
let prevShapeNo;