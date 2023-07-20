'use strict';

class Tetris {
    constructor() {
        console.log('creating tetris object....');
        this.width = 300;
        this.height = 600;
        this.noWidthLines;
        this.scl = 30;
        this.flashRow = [];
        this.gridCoordinates = { x: [0], y: [0] };
        this.shape;
        this.cubes = [];
        this.frameInc = 0;
        this.cubesPerShape = 4
        this.rectBorderRadius = 5;
        this.arrowPressedFlags = {
            left: false,
            right: false,
        }
        this.speedDivider = 1; // the higher the faster the cubes fall. min: 1, max: 60
        this.deleteRowWaitTime = 500; // MS
        this.pause = false;

        this.utility = {
            getRandomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
        }

        this.shapeTypes = [
            'O', 'I', 'T', 'L', 'J', 'S', 'Z'
        ];
    }

    init() {
        this.setGrid();
        this.shape = new Shape();
    }

    setGrid() {
        this.noWidthLines = this.width / this.scl;
        const noHeightLines = this.height / this.scl;

        for (let i = 1; i < this.noWidthLines; i++) {
            this.gridCoordinates.x.push(this.gridCoordinates.x[i - 1] + this.scl);
        }
        this.gridCoordinates.x.shift(); // removes the 0 from the start

        for (let i = 1; i < noHeightLines; i++) {
            this.gridCoordinates.y.push(this.gridCoordinates.y[i - 1] + this.scl);
        }
        this.gridCoordinates.y.shift();
    }

    drawGrid() {
        stroke(255, 204, 0);
        strokeWeight(1);

        this.gridCoordinates.x.forEach(xCoor => {
            line(xCoor, 0, xCoor, height); // line(x1, y1, x2, y2)
        });

        this.gridCoordinates.y.forEach(yCoor => {
            // line(0, yCoor, width, width); // cool pattern
            line(0, yCoor, width, yCoor); // line(x1, y1, x2, y2)
        });
    }

    // create an object
    // add an attribute to the object for every new x pos
    // if x pos already exists on the obj increment the number
    // at end loop through the object seeing if any of the attributes add up to this.noWidthLines
    // if they do delete the row and move all the cubes that were above it down
    checkFullRow() {
        const numberOfXPositions = {}, rowsToDelete = [];
        for (let i = this.cubes.length - 1; i >= 0; --i) {
            if (numberOfXPositions.hasOwnProperty(this.cubes[i].coordinates.y)) {
                numberOfXPositions[this.cubes[i].coordinates.y]++;
                if (numberOfXPositions[this.cubes[i].coordinates.y] === this.noWidthLines) {
                    console.log('full row detected');
                    rowsToDelete.push(this.cubes[i].coordinates.y);
                    // this.deleteRow(this.cubes[i].coordinates.y);
                }
            } else {
                numberOfXPositions[this.cubes[i].coordinates.y] = 1;
            }
        }

        rowsToDelete.sort((a, b) => a - b); // order so it deletes the smallest first
        rowsToDelete.forEach(row => this.deleteRow(row));
    }

    deleteRow(key) {
        // remove all cubes that match the key from the cubes array
        for (let i = this.cubes.length - 1; i >= 0; --i) {
            if (this.cubes[i].coordinates.y === key) {
                this.cubes.splice(i, 1);
            }
        }

        this.flashRow.push({ x: 0, y: key });

        // move all cubes that were above the delete row down one
        setTimeout(() => {
            this.cubes.forEach(cube => {
                if (cube.coordinates.y < key) cube.coordinates.y += Global.scl;
            });
            this.shape.calcShadow();
        }, this.deleteRowWaitTime);
    }

    flash() {
        if (this.flashRow.length === 0) {
            return
        }

        if (this.frameInc % 3 === 0) {
            this.flashRow.forEach(flashDetails => {
                flashDetails.x += Global.scl;

                if (flashDetails.x > width) {
                    this.flashRow = [];
                    return;
                }
            });
        }

        stroke('rgb(255, 204, 0)');
        fill('rgba(232, 232, 232, 1)');
        this.flashRow.forEach(flashDetails =>
            rect(flashDetails.x, flashDetails.y, Global.scl, Global.scl, this.rectBorderRadius));
    }

    togglePause() {
        this.pause = this.shape.disableControls = !this.pause
    }

    createNewShape() {
        if (this.shape.slammed) this.speedDivider = 1;
        this.shape.cubes.forEach(cube => this.cubes.push(cube));
        this.checkFullRow();
        this.shape = new Shape();
    }

    show() {
        this.shape.show(); // display the shape
        this.cubes.forEach(cube => cube.show()); // display all the cubes that have landed
    }
}