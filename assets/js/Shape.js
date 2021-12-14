'use strict';

class Shape {
  static prevRanShapeNum;
  static prevPrevRanShapeNum;

  constructor() {
    console.log('creating shape object...');
    this.shapeType;
    this.positionState = 0;
    this.disableControls = false;
    this.cubes = [];
    this.shadowOpacity = 1;
    this.slammed = false;
    this.getRandomShape();
    this.calcShadow();
  }

  // Get random number that isn't the same as the last two
  getRanShapeNum() {
    const min = 0,
      max = 6;

    let ranShapeNum; 

    do {  
      ranShapeNum = Global.utility.getRandomInt(min, max);
      if (ranShapeNum === Shape.prevRanShapeNum || ranShapeNum === Shape.prevPrevRanShapeNum) {
        ranShapeNum = Global.utility.getRandomInt(min, max);
      }
    } while (ranShapeNum === Shape.prevRanShapeNum || ranShapeNum === Shape.prevPrevRanShapeNum);

    Shape.prevPrevRanShapeNum = Shape.prevRanShapeNum;
    Shape.prevRanShapeNum = ranShapeNum;
    return ranShapeNum;
  }

  // Take ran no and choose a shape at random
  getRandomShape() {
    this.shapeType = this.getRanShapeNum();
    switch (2) {
    // switch (this.shapeType) {
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
  // For all shapes the starting point (top left box from diagram) = Global.scl*4

  createSquare() {
    const xTemp = Global.scl*5;
    const yTemp = -Global.scl; 
    const x = [xTemp, xTemp+Global.scl, xTemp, xTemp+Global.scl];
    const y = [yTemp, yTemp, yTemp*2, yTemp*2];
    this.createShape( x, y, 'rgb(203, 67, 53)', `rgba(241, 148, 138, ${this.shadowOpacity})`); // red
  }

  createLine() {
    const xTemp = Global.scl*4;
    const x = [xTemp,xTemp,xTemp,xTemp];
    const y = [-Global.scl*4,-Global.scl*3,-Global.scl*2,-Global.scl];
    this.createShape( x, y, 'rgb(214, 137, 16)', `rgba(245, 176, 65, ${this.shadowOpacity})`); // orange
    // this.createShape( x, y, 'rgb(186, 74, 0 )', `rgba(237, 187, 153, ${this.shadowOpacity})`); // burnt orange
    // this.createShape( x, y, 'rgb(212, 172, 13 )', `rgba(247, 220, 111 , ${this.shadowOpacity})`); // yellow
  }

  createLShape() {
    const xTemp = Global.scl*5;
    const x = [xTemp-Global.scl,xTemp,xTemp,xTemp];
    const y = [-Global.scl*3,-Global.scl*3,-Global.scl*2,-Global.scl];
    this.createShape( x, y, 'rgb(31, 97, 141)', `rgba(127, 179, 213, ${this.shadowOpacity})`); // dark blue
  }

  createJShape() {
    const xTemp = Global.scl*5;
    const x = [xTemp,xTemp+Global.scl,xTemp,xTemp];
    const y = [-Global.scl*3,-Global.scl*3,-Global.scl*2,-Global.scl];
    this.createShape( x, y, 'rgb(41, 128, 185)', `rgba(169, 204, 227, ${this.shadowOpacity})`); // light blue
  }

  createTee() {
    const xTemp = Global.scl*4;
    const x = [xTemp,xTemp+Global.scl,xTemp+Global.scl,xTemp+(Global.scl*2)];
    const y = [-Global.scl,-Global.scl*2,-Global.scl,-Global.scl];
    this.createShape( x, y, 'rgb(136, 78, 160)', `rgba(195, 155, 211, ${this.shadowOpacity})`); // purple
  }

  createZShape() {
    const x = [Global.scl*4,Global.scl*5,Global.scl*5,Global.scl*6];
    const y = [-Global.scl*2,-Global.scl*2,-Global.scl,-Global.scl];
    this.createShape( x, y, 'rgb(34, 153, 84)', `rgba(169, 223, 191, ${this.shadowOpacity})`); // dark green
  }

  createSShape() {
    const x = [Global.scl*4,Global.scl*5,Global.scl*5,Global.scl*6];
    const y = [-Global.scl,-Global.scl,-Global.scl*2,-Global.scl*2];
    this.createShape( x, y, 'rgb(46, 204, 113)', `rgba(171, 235, 198, ${this.shadowOpacity})`); // light green
  }

  // End of shapes //

  rotate() {
    const { scl } = Global;
    console.log(this.positionState);
    switch (this.positionState) {
      case 0: 
        this.cubes[0].coordinates.y += scl;
        this.cubes[0].coordinates.x += scl * 2;        
        // this.cubes[1].coordinates.y = y;     
        this.cubes[1].coordinates.x += scl;
        this.cubes[2].coordinates.y += -scl;
        // this.cubes[2].coordinates.x = x;
        this.cubes[3].coordinates.y += -scl * 2;
        this.cubes[3].coordinates.x += -scl;
        break;
      case 1: 
        this.cubes[0].coordinates.y += scl * 2 ;
        this.cubes[0].coordinates.x += -scl;        
        this.cubes[1].coordinates.y += scl;     
        // this.cubes[1].coordinates.x = x;
        // this.cubes[2].coordinates.y = y;
        this.cubes[2].coordinates.x += scl;
        this.cubes[3].coordinates.y += -scl;
        this.cubes[3].coordinates.x += scl * 2;
        break;
      case 2: 
        this.cubes[0].coordinates.y += -scl;
        this.cubes[0].coordinates.x += -scl * 2;
        // this.cubes[1].coordinates.y = y;
        this.cubes[1].coordinates.x += -scl;
        this.cubes[2].coordinates.y += scl;
        // this.cubes[2].coordinates.x = x;
        this.cubes[3].coordinates.y += scl * 2;
        this.cubes[3].coordinates.x += scl;
        break;
      case 3: 
        this.cubes[0].coordinates.y += -scl * 2;
        this.cubes[0].coordinates.x += scl;
        this.cubes[1].coordinates.y += -scl;
        // this.cubes[1].coordinates.x = x;
        // this.cubes[2].coordinates.y = y;
        this.cubes[2].coordinates.x += -scl;
        this.cubes[3].coordinates.y += scl;
        this.cubes[3].coordinates.x += -scl * 2;
    }
    this.positionState = (this.positionState + 1) % 4; // increment and wrap 
    this.calcShadow();
  }

  // move the cube by the Global.scl
  // if the button is held down for more than 300ms the cube gets moved by Global.scl every 55ms
  moveXHandler(collideMethod, moveValue, direction) {
    Global.arrowPressedFlags[direction] = true;
    if (!this.disableControls) this.moveX(collideMethod, moveValue);

    setTimeout(() => { 
      if (Global.arrowPressedFlags[direction]) {
        const intervalId = setInterval(() => {
          if (Global.arrowPressedFlags[direction] && !this.disableControls) {
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
        Global.createNewShape();
        return;
      }
    }
    this.cubes.forEach(cube => cube.moveY());
  }

  // find the cubes with the same x pos's as the shapes cubes
  // calculate the distance between them
  // store the smallest value in a temp var
  // Check to see if any cbues are closer to the bottom of the canvas
  // add this onto the y cordinates - Global.scl to shift it up one
  calcShadow() {
    let yTemp = Global.height*2; // *2 becuase when shape starts the distance is bigger than the height 
    this.cubes.forEach(shapeCube => {
      Global.cubes.forEach(gCube => { // check distance from all cubes
        if (shapeCube.coordinates.x === gCube.coordinates.x && 
          (gCube.coordinates.y - shapeCube.coordinates.y) < yTemp &&
          shapeCube.coordinates.y < gCube.coordinates.y
        ) {
          yTemp = gCube.coordinates.y - shapeCube.coordinates.y;
        }
      }); 
    });

    this.cubes.forEach(cube => {  // check dinstance from bottom 
      let distanceFromBottom = cube.coordinates.y < 0 ? Global.height + Math.abs(cube.coordinates.y) : Global.height - cube.coordinates.y; // when cube starts its y is a minus value
      if (distanceFromBottom < yTemp) yTemp = distanceFromBottom;
    });    

    this.cubes.forEach(cube => {
      cube.shadow.coordinates.x = cube.coordinates.x;
      cube.shadow.coordinates.y = cube.coordinates.y - Global.scl + yTemp;
    });
  }

  showShadow() {
    this.cubes.forEach(cube => cube.showShadow());
  }

  slam() {
    // speed the whole thing up
    this.disableControls = true;
    Global.speedDivider = 60;
    this.slammed = true;
  }

  show() {
    Global.shape.showShadow(); // display shape shadow - behind the actual shape
    this.cubes.forEach(cube => cube.show());
  }
}