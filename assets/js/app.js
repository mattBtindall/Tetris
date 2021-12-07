'use strict';
let xPos;
const testFunc = () => {
  xPos = 150;
  G.speedDivider = 2;
}

function setGrid() {
  const noWidthLines = width / G.scl;
  const noHeightLines = height / G.scl; 

  for (let i = 1; i < noWidthLines; i++) {
    G.gridCoordinates.x.push(G.gridCoordinates.x[i-1]+G.scl);
  }
  G.gridCoordinates.x.shift(); // removes the 0 from the start

  for (let i = 1; i < noHeightLines; i++) {
    G.gridCoordinates.y.push(G.gridCoordinates.y[i-1]+G.scl);
  }
  G.gridCoordinates.y.shift(); 
}

function drawGrid() {
  stroke(255, 204, 0);
  strokeWeight(2.5);

  G.gridCoordinates.x.forEach(xCoor => {
    line(xCoor, 0, xCoor, height); // line(x1, y1, x2, y2)
  });

  G.gridCoordinates.y.forEach(yCoor => {
    // line(0, yCoor, width, width); // cool pattern
    line(0, yCoor, width, yCoor); // line(x1, y1, x2, y2)
  });
}

function setup() {
  createCanvas(300, 600);
  frameRate(60);
  xPos = G.scl * 3;
  G.cube = new Cube({x: xPos, y: -G.scl, colour: 'rgb(108, 52, 131)', shadowColour: 'rgb(187, 143, 206)'});
  setGrid();
}

function draw() {
  background('#ccc');
  G.frameInc = (G.frameInc + 1) % 60; // increment and wrap 
  drawGrid();

  if (G.frameInc % (60 / G.speedDivider) === 0) {
    G.cube.moveY();
  }

  G.cube.showShadow();
  G.cube.show();
  G.cubes.forEach(cube => cube.show());
}

function newCube() {
  G.cubes.push(G.cube);
  G.cube = new Cube({x: xPos, y: -G.scl, colour: 'rgb(108, 52, 131)', shadowColour: 'rgb(187, 143, 206)'});
}