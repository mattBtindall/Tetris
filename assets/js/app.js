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
  G.shape = new Shape();
  setGrid();
}

function draw() {
  background('#ccc');
  G.frameInc = (G.frameInc + 1) % 60; // increment and wrap 
  drawGrid();

  if (G.frameInc % (60 / G.speedDivider) === 0) {
    G.shape.moveY();
  }

  G.shape.showShadow(); // display shape shadow - below the actual shape
  G.shape.show(); // display the shape
  G.cubes.forEach(cube => cube.show()); // display all the cubes that have landed
}

function createNewShape() {
  console.log('creating new shape...');
  G.shape.cubes.forEach(cube => G.cubes.push(cube));
  G.shape = new Shape();
}