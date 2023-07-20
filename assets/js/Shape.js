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

        /**
         * Coordinates here can be confusing at first glance.
         * The array contains coordinates for 4 rotations - hence 4 arrays
         * each time the up key is pressed one of these arrays (corresponding with this.positionState) is used to offset the cubes coordinates
         * There are only three arrays within here (three sets of coordinates) - only three of the cubes move upon rotation (the 3rd always stays the same)
         * within these arrays lay the number(s) (factors of the scale) that the cubes are moved by
         * if there is only one value then it is used for both the x and y
         */
        const scl = Global.scl;
        this.rotateMovementCoordinates = {
            I: [
                [[2 * scl], [scl], [-1 * scl]], // positionState 0: cube[0].x += 2 * scl, cube[0].y += 2 * scl, cube[1].x += scl, cube[1].y += scl, cube[3].x += -1 * scl, cube[3].y += -1 * scl
                [[-2 * scl, 2 * scl], [-1 * scl, scl], [scl, -1 * scl]],
                [[-2 * scl], [-1 * scl], [scl]],
                [[2 * scl, -2 * scl], [scl, -1 * scl], [-1 * scl, scl]]
            ],
            T: [
                [[scl], [scl, -1 * scl], [-1 * scl, scl]],
                [[-1 * scl, scl], [scl], [-1 * scl]],
                [[-1 * scl], [-1 * scl, scl], [scl, -1 * scl]],
                [[scl, -1 * scl], [-1 * scl], [scl]]
            ],
            L: [
                [[0, 2 * scl], [-1 * scl, scl], [scl, -1 * scl]],
                [[-2 * scl, 0], [-1 * scl, -1 * scl], [scl, scl]],
                [[0, -2 * scl], [scl, -1 * scl], [-1 * scl, scl]],
                [[2 * scl, 0], [scl], [-1 * scl]]
            ],
            J: [
                [[2 * scl, 0], [scl, -1 * scl], [-1 * scl, scl]],
                [[0, 2 * scl], [scl], [-1 * scl]],
                [[-2 * scl, 0], [-1 * scl, scl], [scl, -1 * scl]],
                [[0, -2 * scl], [-1 * scl], [scl]]
            ],
            S: [
                [[0, -2 * scl], [-1 * scl], [-1 * scl, scl]],
                [[2 * scl, 0], [scl, -1 * scl], [-1 * scl]],
                [[0, 2 * scl], [scl], [scl, -1 * scl]],
                [[-2 * scl, 0], [-1 * scl, scl], [scl]]
            ],
            Z: [
                [[2 * scl, 0], [scl], [-1 * scl, scl]],
                [[0, 2 * scl], [-1 * scl, scl], [-1 * scl]],
                [[-2 * scl, 0], [-1 * scl], [scl, -1 * scl]],
                [[0, -2 * scl], [scl, -1 * scl], [scl]]
            ]
        }
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
        const xTemp = 4 * Global.scl;
        const x = [xTemp, xTemp, xTemp, xTemp];
        const y = [-4 * Global.scl, -3 * Global.scl, -2 * Global.scl, -1 * Global.scl];
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
        const x = [3 * Global.scl, 4 * Global.scl, 4 * Global.scl, 5 * Global.scl];
        const y = [-1 * Global.scl, -1 * Global.scl, -2 * Global.scl, -2 * Global.scl];
        this.createShape(x, y, 'rgb(46, 204, 113)', `rgba(171, 235, 198, ${this.shadowOpacity})`); // light green
    }

    // End of shapes //

    rotate() {
        if (!this.rotateMovementCoordinates.hasOwnProperty(this.shapeType)) {
            return;
        }

        const rotateCoordinates = this.rotateMovementCoordinates[this.shapeType][this.positionState];
        if (!this.canRotate(rotateCoordinates)) {
            return
        }

        this.setCubeCoordinates(rotateCoordinates)
        this.positionState = (this.positionState + 1) % 4; // increment and wrap
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
        this.cubes[3].setCoordinates(n[2][0], n[2][1]);
    }

    canRotate(n) {
        return this.cubes[0].canRotate(n[0][0], n[0][1]) &&
            this.cubes[1].canRotate(n[1][0], n[1][1]) &&
            this.cubes[3].canRotate(n[2][0], n[2][1])
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
