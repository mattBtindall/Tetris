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
        this.init();
    }

    init() {
        this.getRandomShape();
        this.calcShadow();
    }

    // Get random number that isn't the same as the last two
    getRanShapeType() {
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
        return Global.shapeTypes[ranShapeNum];
    }

    // Take ran no and choose a shape at random
    getRandomShape() {
        this.shapeType = this.getRanShapeType();
        switch (this.shapeType) {
            case 'O':
                this.createO();
                break;
            case 'I':
                this.createI();
                break;
            case 'T':
                this.createT();
                break;
            case 'L':
                this.createL();
                break;
            case 'J':
                this.createJ();
                break;
            case 'S':
                this.createS();
                break;
            case 'Z':
                this.createZ();
                break;
        }
    }

    // Different shape layouts
    createShape(x, y, colour, shadowColour) {
        for (let i = 0; i < Global.cubesPerShape; ++i) {
            this.cubes[i] = new Cube({ x: x[i], y: y[i], colour, shadowColour, shape: this });
        }
    }

    // Create Different Shapes
    // For all shapes the starting point (top left box from diagram) = Global.scl*4

    createO() {
        const xTemp = 5 * Global.scl;
        const yTemp = -Global.scl;
        const x = [xTemp, xTemp + Global.scl, xTemp, xTemp + Global.scl];
        const y = [yTemp, yTemp, 2 * yTemp, 2 * yTemp];
        this.createShape(x, y, 'rgb(203, 67, 53)', `rgba(241, 148, 138, ${this.shadowOpacity})`); // red
    }

    createI() {
        const yTemp = -1 * Global.scl;
        const x = [2 * Global.scl, 3 * Global.scl, 4 * Global.scl, 5 * Global.scl];
        const y = [yTemp, yTemp, yTemp, yTemp];
        this.createShape(x, y, 'rgb(214, 137, 16)', `rgba(245, 176, 65, ${this.shadowOpacity})`); // orange
        // this.createShape( x, y, 'rgb(186, 74, 0 )', `rgba(237, 187, 153, ${this.shadowOpacity})`); // burnt orange
        // this.createShape( x, y, 'rgb(212, 172, 13 )', `rgba(247, 220, 111 , ${this.shadowOpacity})`); // yellow
    }

    createL() {
        const xTemp = 5 * Global.scl;
        const x = [xTemp, xTemp, xTemp - Global.scl, xTemp - (2 * Global.scl)];
        const y = [-2 * Global.scl, -1 * Global.scl, -1 * Global.scl, -1 * Global.scl,]
        this.createShape(x, y, 'rgb(31, 97, 141)', `rgba(127, 179, 213, ${this.shadowOpacity})`); // dark blue
    }

    createJ() {
        const xTemp = 4 * Global.scl;
        const x = [xTemp, xTemp, xTemp + Global.scl, xTemp + Global.scl * 2];
        const y = [-2 * Global.scl, -1 * Global.scl, -1 * Global.scl, -1 * Global.scl];
        this.createShape(x, y, 'rgb(41, 128, 185)', `rgba(169, 204, 227, ${this.shadowOpacity})`); // light blue
    }

    createT() {
        const xTemp = 4 * Global.scl;
        const x = [xTemp + Global.scl, xTemp, xTemp + Global.scl, xTemp + (Global.scl * 2)];
        const y = [-2 * Global.scl, -1 * Global.scl, -1 * Global.scl, -1 * Global.scl];
        this.createShape(x, y, 'rgb(136, 78, 160)', `rgba(195, 155, 211, ${this.shadowOpacity})`); // purple
    }

    createZ() {
        const x = [3 * Global.scl, 4 * Global.scl, 4 * Global.scl, 5 * Global.scl];
        const y = [-2 * Global.scl, -2 * Global.scl, -1 * Global.scl, -1 * Global.scl];
        this.createShape(x, y, 'rgb(34, 153, 84)', `rgba(169, 223, 191, ${this.shadowOpacity})`); // dark green
    }

    createS() {
        const x = [5 * Global.scl, 4 * Global.scl, 4 * Global.scl, 3 * Global.scl]
        const y = [-2 * Global.scl, -2 * Global.scl, -1 * Global.scl, -1 * Global.scl]
        this.createShape(x, y, 'rgb(46, 204, 113)', `rgba(171, 235, 198, ${this.shadowOpacity})`); // light green
    }

    // End of shapes //

    rotate() {
        if (!Global.rotateMovementCoordinates.hasOwnProperty(this.shapeType)) {
            return;
        }

        const rotateCoordinates = Global.rotateMovementCoordinates[this.shapeType][this.positionState];
        const wallKickOffSetCoordinates = this.getWallKickoffSetCoordinates(rotateCoordinates);
        if (!wallKickOffSetCoordinates) {
            return;
        }

        this.setCubeCoordinates(wallKickOffSetCoordinates);
        this.positionState = (this.positionState + 1) % 4; // increment and wrap
        this.setFlash();
        this.calcShadow();
    }

    /**
     * set the coordinates of cubes 1, 2 and 4 - 3 doesn't move
     * @param {array} n - multi dimensional array [[x, y], [x, y], [x, y]] if y omitted then the x value if used
     * @returns {void}
     */
    setCubeCoordinates(n) {
        this.cubes[0].setCoordinates(n[0][0], n[0][1]);
        this.cubes[1].setCoordinates(n[1][0], n[1][1]);
        this.cubes[2].setCoordinates(n[2][0], n[2][1]);
        this.cubes[3].setCoordinates(n[3][0], n[3][1]);
    }

    getWallKickoffSetCoordinates(rotateCoordinates) {
        const wallKickOffSets = Global.wallKicks[Global.wallKickMaps[this.shapeType]][this.positionState];
        for (const offset of wallKickOffSets) {
            let rotateCoordinatesTemp = [...rotateCoordinates];
            rotateCoordinatesTemp = rotateCoordinatesTemp.map(coordinates => [coordinates[0] + offset[0], coordinates[1] + offset[1]]);
            if (this.canRotate(rotateCoordinatesTemp)) {
                return rotateCoordinatesTemp;
            }
        }

        return false
    }

    canRotate(n) {
        return this.cubes[0].canRotate(n[0][0], n[0][1]) &&
            this.cubes[1].canRotate(n[1][0], n[1][1]) &&
            this.cubes[2].canRotate(n[2][0], n[2][1]) &&
            this.cubes[3].canRotate(n[3][0], n[3][1])
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

    /**
     * used only for mouse drag
     */
    moveSingleLeft() {
        this.moveX('collideLeft', -1 * Global.scl)
    }

    /**
     * used only for mouse drag
     */
    moveSingleRight() {
        this.moveX('collideRight', Global.scl)
    }

    collideY() {
        for (const cube of this.cubes) {
            if (cube.collideY()) {
                return true;
            }
        }
        return false;
    }

    setFlash() {
        if (this.collideY()) {
            this.flash = true;
            return;
        }

        if (this.flash) {
            this.resetColour();
            this.flash = false;
        }
    }

    moveY() {
        if (this.collideY()) {
            this.disableControls = true;
            this.resetColour();
            Global.createNewShape();
            return
        }
        this.cubes.forEach(cube => cube.moveY());
        this.setFlash();
    }

    // find the cubes with the same x pos's as the shapes cubes
    // calculate the distance between them
    // store the smallest value in a temp var
    // Check to see if any cbues are closer to the bottom of the canvas
    // add this onto the y cordinates - Global.scl to shift it up one
    calcShadow() {
        let yTemp = Global.height * 2; // *2 becuase when shape starts the distance is bigger than the height
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

    flashColour() {
        if (!this.flash) {
            return;
        }

        if (Global.frameInc % 10 === 0) {
            this.cubes.forEach(cube => cube.flash())
        }
    }

    showShadow() {
        this.cubes.forEach(cube => cube.showShadow());
    }

    slam() {
        // speed the whole thing up
        this.disableControls = true;
        Global.speedDivider = 1;
        this.slammed = true;
    }

    show() {
        Global.shape.showShadow(); // display shape shadow - behind the actual shape
        this.flashColour()
        this.cubes.forEach(cube => cube.show());
    }

    resetColour() {
        this.cubes.forEach(cube => cube.resetColour());
    }
}
