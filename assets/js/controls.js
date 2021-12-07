function keyPressed() {
  if (keyCode === UP_ARROW) {
    // when spinning the shape do so here
  } else if (keyCode === DOWN_ARROW) {
    G.cube.yspeedMultiplier = 6;
  } else if (keyCode === RIGHT_ARROW) {
    G.cube.moveXHandler('moveRight', 'right');
  } else if (keyCode === LEFT_ARROW) {
    G.cube.moveXHandler('moveLeft', 'left');
  } else if (keyCode === 32) {
    G.cube.slam();
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    G.arrowPressedFlags.right = false;
  } else if (keyCode === LEFT_ARROW) {
    G.arrowPressedFlags.left = false;
  }
}