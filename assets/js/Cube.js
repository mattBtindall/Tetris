'use strict';

class Cube {
  constructor(spec) {
    const { x, y, colour, shadowColour } = spec;
    this.coordinates = createVector(x, y);
    this.colour = colour; // 'rgb(108, 52, 131)'
    this.yspeed = 1;
    this.yspeedMultiplier = 1;
    this.yStop = false;
    this.shadow = {
      coordinates: createVector(this.coordinates.x, height - G.scl),
      colour: shadowColour
    }

    this.calculateShadow();
  }

  // splt into two methods

  // collideY
  // if collideY() === true

  // moveY

  moveY() {
    if (this.coordinates.y >= height-G.scl) { // see if hit the bottom
      this.yStop = true;
      newCube();
      return;
    }

    for (const cube of G.cubes) { // see if landed ontop of another cube
      if (this.coordinates.x === cube.coordinates.x && this.coordinates.y >= cube.coordinates.y - G.scl) {
        newCube();
        this.yStop = true;
        return;
      }
    }
    
    this.coordinates.y += G.scl*this.yspeedMultiplier;
  }

  moveLeft() {
    if (this.coordinates.x <= 0) return; // hit side
    for (const cube of G.cubes) { // hit another cube
      if (this.coordinates.x === cube.coordinates.x + G.scl && this.coordinates.y >= cube.coordinates.y) {
        return;
      }
    }
    
    this.coordinates.x -= G.scl;
    this.calculateShadow();
  }

  moveRight() {
    if (this.coordinates.x >= width-G.scl) return; // hit side
    for (const cube of G.cubes) { // hit another cube
      if (this.coordinates.x === cube.coordinates.x - G.scl && this.coordinates.y >= cube.coordinates.y) {
        return;
      }
    }

    this.coordinates.x += G.scl;
    this.calculateShadow();
  }

  // move by G.scl but if arrow is pressed for more than 300ms then it moves by G.scl every 55ms until released or until the cube hits another cube or the bottom
  moveXHandler(moveMethod, direction) {
    G.arrowPressedFlags[direction] = true;
    this[moveMethod]();

    setTimeout(() => { 
      if (G.arrowPressedFlags[direction]) {
        const intervalId = setInterval(() => {
          if (G.arrowPressedFlags[direction] && !this.yStop) {
            this[moveMethod]();
          } else {
            clearInterval(intervalId);
          }
        }, 55);
      } 
    }, 300);
  }
  
  calculateShadow() { // only calc shadow on creation and on move
    let closestCube, heightTemp = height+1;
    G.cubes.forEach(cube => {
      if (this.coordinates.x === cube.coordinates.x && this.coordinates.y < cube.coordinates.y && cube.coordinates.y < heightTemp) {
        // get the cube with the highest y unless this.y is lower down than that
        // store that cube within a temp variable
        closestCube = cube;
      }
    });

    this.shadow.coordinates.x = this.coordinates.x;
    if (closestCube) 
      this.shadow.coordinates.y = closestCube.coordinates.y - G.scl; 
    else 
      this.shadow.coordinates.y = height - G.scl; 
  }

  // slam() { 
    // This needs to be done on a shape basis, one of the other cubes might collide with another cube
    // this.coordinates.y = this.shadow.coordinates.y;
    // this.moveY();
  // }

  showShadow() {
    fill(this.shadow.colour);
    stroke('#ccc');
    strokeWeight(.5);
    rect(this.shadow.coordinates.x, this.shadow.coordinates.y, G.scl, G.scl, 5);
  }

  show() {
    fill(this.colour);
    stroke('rgb(255, 204, 0)');
    rect(this.coordinates.x, this.coordinates.y, G.scl, G.scl, 5);
  }
}