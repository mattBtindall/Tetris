'use strict';

function setGrid() {
  const noWidthLines = width / G.scl;
  const noHeightLines = height / G.scl; 

  for (let i = 1; i < noWidthLines; i++) {
    G.gridCoordinates.x.push(G.gridCoordinates.x[i-1]+G.scl);
  }
  G.gridCoordinates.x[G.gridCoordinates.x.length] = G.gridCoordinates.x[G.gridCoordinates.x.length-1]+G.scl; 

  for (let i = 1; i < noHeightLines; i++) {
    G.gridCoordinates.y.push(G.gridCoordinates.y[i-1]+G.scl);
  }
  G.gridCoordinates.y[G.gridCoordinates.y.length] = G.gridCoordinates.y[G.gridCoordinates.y.length-1]+G.scl; 
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
  G.box = new Box({x: 150, y: -G.scl});
  createCanvas(300, 600);
  frameRate(60);
  setGrid();
}

function draw() {
  background(51);
  G.frameInc = (G.frameInc + 1) % 60; 

  drawGrid();

  if (G.frameInc % 5 === 0) {
    G.box.moveX();    
  }

  if (G.frameInc % 30 === 0) {
    G.box.moveY();
  }

  G.box.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    // when spinning the shape do so here
  } else if (keyCode === DOWN_ARROW) {
    G.box.yspeedMultiplier = 6;
  } else if (keyCode === RIGHT_ARROW) {
    // detect how long the arrow is held down for, if it is below a threshold then only move one square, if above threshold then move rapidly to the right 
    // G.box.xspeed = 2;
    G.box.coordinates.x+= G.scl;
  } else if (keyCode === LEFT_ARROW) {
    // G.box.xspeed = -2;
    G.box.coordinates.x-= G.scl;
  }
}
