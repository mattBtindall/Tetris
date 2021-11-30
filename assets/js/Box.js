'use strict';

class Box {
  constructor(spec) {
    console.log('box instantiated');

    const { x, y } = spec;
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 1;
  }

  update() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  show() {
    rect(this.x, this.y, Global.scl, Global.scl);
  }
}