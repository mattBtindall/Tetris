'use strict';

class Box {
  constructor(spec) {
    const { x, y } = spec;
    this.coordinates = createVector(x, y);
    this.colour = color(255, 255, 255);
    this.xspeed = 0;
    this.yspeed = 1;
    this.yspeedMultiplier = 1;
  }

  direction(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  moveX() {
    this.coordinates.x += this.xspeed*G.scl;
    this.coordinates.x = constrain(this.coordinates.x, 0, width-G.scl);
  }

  moveY() {
    this.coordinates.y += G.scl*this.yspeedMultiplier;

    // remove this after adding in a collide function
    this.coordinates.y = constrain(this.coordinates.y, 0, height-G.scl); 
  }

  show() {
    fill(this.colour);
    stroke(this.colour);
    rect(this.coordinates.x, this.coordinates.y, G.scl, G.scl);
  }
}