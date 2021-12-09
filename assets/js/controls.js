function keyPressed() {
  switch (keyCode) {
    case UP_ARROW: 
      // spin shape here
      console.log('spinning shape');
      break;
    case DOWN_ARROW: 
      G.speedDivider = 15;
      break;
    case RIGHT_ARROW: 
      G.shape.moveXHandler('collideRight', G.scl, 'right');
      break;
    case LEFT_ARROW:
      G.shape.moveXHandler('collideLeft', -G.scl, 'left');
      break;
    case 32: // spacebar
      G.shape.slam();
      break;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    G.arrowPressedFlags.right = false;
  } else if (keyCode === LEFT_ARROW) {
    G.arrowPressedFlags.left = false;
  } else if (keyCode === DOWN_ARROW) {
    G.speedDivider = 1;
  }
}