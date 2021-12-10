'use strict';

class Cube {
  constructor(spec) {
    const { x, y, colour, shadowColour, shape } = spec;
    this.shape = shape;
    this.coordinates = createVector(x, y);
    this.colour = colour; // 'rgb(108, 52, 131)'
    this.ogColour = colour; // TEST VARIABLE // 
    // this.yspeed = 0;
    this.yspeedMultiplier = 1;
    this.yStop = false;
    this.shadow = {
      coordinates: createVector(this.coordinates.x, height - G.scl),
      colour: shadowColour
    }
  }

  collideY() {
    if (this.coordinates.y >= height-G.scl) return true; // see if hit the bottom

    for (const cube of G.cubes) { // see if landed ontop of another cube
      if (this.coordinates.x === cube.coordinates.x && this.coordinates.y === cube.coordinates.y - G.scl) 
        return true;
    }

    return false;
  }

  moveY() {
    this.coordinates.y += G.scl*this.yspeedMultiplier;
  }

  collideLeft() {
    if (this.coordinates.x <= 0) return true; // hit side
    for (const cube of G.cubes) { // hit another cube
      if (
        this.coordinates.x === cube.coordinates.x + G.scl && 
        this.coordinates.y >= cube.coordinates.y && 
        this.coordinates.y <= cube.coordinates.y + (G.scl - 1)
      ) 
        return true; 
    }
  }

  collideRight() {
    if (this.coordinates.x >= width-G.scl) return true; // hit side
    for (const cube of G.cubes) { // hit another cube
      if (
        this.coordinates.x === cube.coordinates.x - G.scl &&
        this.coordinates.y >= cube.coordinates.y &&
        this.coordinates.y <= cube.coordinates.y + (G.scl - 1)
      )
        return true;
    }
  }

  moveX(direction) {
    this.coordinates.x += direction;
  }

  showShadow() {
    fill(this.shadow.colour);
    stroke('rgb(255, 204, 0)');
    strokeWeight(.5);
    rect(this.shadow.coordinates.x, this.shadow.coordinates.y, G.scl, G.scl, 5);
  }

  show() {
    fill(this.colour);
    stroke('rgb(255, 204, 0)');
    rect(this.coordinates.x, this.coordinates.y, G.scl, G.scl, 5);
  }
}