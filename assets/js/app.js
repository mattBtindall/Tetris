'use strict';

let box;

function setup() {
  box = new Box({x: 300, y: Global.scl});
  createCanvas(600, 600);
}

function draw() {
  background(51);
  box.update();
  box.show();
}