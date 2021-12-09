'use strict';

class Shape {
  static prevRanShapeNum;
  static prevPrevRanShapeNum;

  constructor() {
    this.disableControls = false;
    this.cubes = [];
    this.shadowOpacity = 1;
    this.getRandomShape();
    this.calcShadow();
    this.toSlam = false;
  }

  // Get random number that isn't the same as the last two
  getRanShapeNum() {
    const min = 0,
      max = 6;

    let ranShapeNum; 

    do {  
      ranShapeNum = G.getRandomInt(min, max);
      if (ranShapeNum === Shape.prevRanShapeNum || ranShapeNum === Shape.prevPrevRanShapeNum) {
        ranShapeNum = G.getRandomInt(min, max);
      }
    } while (ranShapeNum === Shape.prevRanShapeNum || ranShapeNum === Shape.prevPrevRanShapeNum);

    Shape.prevPrevRanShapeNum = Shape.prevRanShapeNum;
    Shape.prevRanShapeNum = ranShapeNum;
    return ranShapeNum;
  }

  // Take ran no and choose a shape at random
  getRandomShape() {
    // switch (0) {
    switch (this.getRanShapeNum()) {
      case 0 :
        this.createSquare();
        break;
      case 1 :
        this.createLine();
        break;
      case 2 : 
        this.createTee();
        break;
      case 3 : 
        this.createLShape();
        break;
      case 4 : 
        this.createJShape();
        break;
      case 5 : 
        this.createSShape();
        break;
      case 6 :
        this.createZShape();
        break;
    }
  }

  // Different shape layouts
  createShape(x, y, colour, shadowColour) {
    for (let i = 0; i < 4; ++i) {
      this.cubes[i] = new Cube({ x: x[i], y: y[i], colour, shadowColour, shape: this});
    }
  }

  // Create Different Shapes
  // For all shapes the starting point (top left box from diagram) = G.scl*4

  createSquare() {
    const xTemp = G.scl*5;
    const yTemp = -G.scl; 
    const x = [xTemp, xTemp+G.scl, xTemp, xTemp+G.scl];
    const y = [yTemp, yTemp, yTemp*2, yTemp*2];
    this.createShape( x, y, 'rgb(203, 67, 53)', `rgba(241, 148, 138, ${this.shadowOpacity})`); // red
  }

  createLine() {
    const xTemp = G.scl*4;
    const x = [xTemp,xTemp,xTemp,xTemp];
    const y = [-G.scl*4,-G.scl*3,-G.scl*2,-G.scl];
    this.createShape( x, y, 'rgb(214, 137, 16)', `rgba(245, 176, 65, ${this.shadowOpacity})`); // orange
    // this.createShape( x, y, 'rgb(186, 74, 0 )', `rgba(237, 187, 153, ${this.shadowOpacity})`); // burnt orange
    // this.createShape( x, y, 'rgb(212, 172, 13 )', `rgba(247, 220, 111 , ${this.shadowOpacity})`); // yellow
  }

  createLShape() {
    const xTemp = G.scl*5;
    const x = [xTemp-G.scl,xTemp,xTemp,xTemp];
    const y = [-G.scl*3,-G.scl*3,-G.scl*2,-G.scl];
    this.createShape( x, y, 'rgb(31, 97, 141)', `rgba(127, 179, 213, ${this.shadowOpacity})`); // dark blue
  }

  createJShape() {
    const xTemp = G.scl*5;
    const x = [xTemp,xTemp+G.scl,xTemp,xTemp];
    const y = [-G.scl*3,-G.scl*3,-G.scl*2,-G.scl];
    this.createShape( x, y, 'rgb(41, 128, 185)', `rgba(169, 204, 227, ${this.shadowOpacity})`); // light blue
  }

  createTee() {
    const xTemp = G.scl*4;
    const x = [xTemp,xTemp+G.scl,xTemp+G.scl,xTemp+(G.scl*2)];
    const y = [-G.scl,-G.scl*2,-G.scl,-G.scl];
    this.createShape( x, y, 'rgb(136, 78, 160)', `rgba(195, 155, 211, ${this.shadowOpacity})`); // purple
  }

  createZShape() {
    const x = [G.scl*4,G.scl*5,G.scl*5,G.scl*6];
    const y = [-G.scl*2,-G.scl*2,-G.scl,-G.scl];
    this.createShape( x, y, 'rgb(34, 153, 84)', `rgba(169, 223, 191, ${this.shadowOpacity})`); // dark green
  }

  createSShape() {
    const x = [G.scl*4,G.scl*5,G.scl*5,G.scl*6];
    const y = [-G.scl,-G.scl,-G.scl*2,-G.scl*2];
    this.createShape( x, y, 'rgb(46, 204, 113)', `rgba(171, 235, 198, ${this.shadowOpacity})`); // light green
  }

  // End of shapes //

  // move the cube by the G.scl
  // if the button is held down for more than 300ms the cube gets moved by G.scl every 55ms
  moveXHandler(collideMethod, moveValue, direction) {
    G.arrowPressedFlags[direction] = true;
    if (!this.disableControls) this.moveX(collideMethod, moveValue);

    setTimeout(() => { 
      if (G.arrowPressedFlags[direction]) {
        const intervalId = setInterval(() => {
          if (G.arrowPressedFlags[direction] && !this.disableControls) {
            this.moveX(collideMethod, moveValue);
          } else {
            clearInterval(intervalId);
          }
        }, 55);
      } 
    }, 300);
  }

  // Premise of the move functions:
  // check each cube to see if they hit anything
  // if they do stop all cubes from moving
  // if they don't then move all cubes
  moveX(collideMethod, moveValue) {
    for (const cube of this.cubes) {
      if (cube[collideMethod]()) {
        return;
      }
    }
    this.cubes.forEach(cube => cube.moveX(moveValue));
    this.calcShadow();
  }

  moveY() {
    for (const cube of this.cubes) {
      if (cube.collideY()) {
        this.disableControls = true;
        createNewShape();
        return;
      }
    }
    this.cubes.forEach(cube => cube.moveY());
  }

  // find the cubes with the same x pos's as the shapes cubes
  // calculate the distance between them
  // store the smallest value (cloest cube) in a temp var
  // Check to see if any cbues are closer to the bottom of the canvas
  // add this onto the y cordinates - G.scl to shift it up one
  calcShadow() {
    let yTemp = height*2; // *2 becuase when shape starts the distance is bigger than the height 
    this.cubes.forEach(shapeCube => {
      G.cubes.forEach(gCube => { // check distance from all cubes
        if (shapeCube.coordinates.x === gCube.coordinates.x && 
          (gCube.coordinates.y - shapeCube.coordinates.y) < yTemp &&
          shapeCube.coordinates.y < gCube.coordinates.y
        ) {
          yTemp = gCube.coordinates.y - shapeCube.coordinates.y;
        }
      }); 
    });

    this.cubes.forEach(cube => {  // check dinstance from bottom 
      let distanceFromBottom = cube.coordinates.y < 0 ? height + Math.abs(cube.coordinates.y) : height - cube.coordinates.y; // when cube starts its y is a minus value
      if (distanceFromBottom < yTemp) yTemp = distanceFromBottom;
    });    

    this.cubes.forEach(cube => {
      cube.shadow.coordinates.x = cube.coordinates.x;
      cube.shadow.coordinates.y = cube.coordinates.y - G.scl + yTemp;
    });
  }

  showShadow() {
    this.cubes.forEach(cube => cube.showShadow());
  }

  slam() {
    // speed the whole thing up
    this.disableControls = true;
    G.speedDivider = 60;
    this.toSlam = true;
  }

  show() {
    this.cubes.forEach(cube => cube.show());
  }
}