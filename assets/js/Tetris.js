'use strict';

class Tetris {
    constructor() {
        console.log('creating tetris object....');
        this.frameRate = 60;
        this.width = 300;
        this.height = 600;
        this.backgroundColour = '#ccc';
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
        this.rowsDeletedLastRound = 0;
        this.score = 0;
        this.deleteRowWaitTime = 500; // MS
        this.pause = false;
        this.level = 1;
        this.currentLeveleRowsDeleted = 0; // rows deleted for the CURRENT LEVEL

        this.utility = {
            getRandomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
        }

        // maps the shape to a number (the index)
        this.shapeTypes = [
            'O', 'I', 'T', 'L', 'J', 'S', 'Z'
        ];

        /**
         * Coordinates here can be confusing at first glance.
         * The array contains coordinates for 4 rotations - hence 4 arrays
         * each time the up key is pressed one of these arrays (corresponding with this.positionState) is used to offset the cubes coordinates
         * for all shapes but 'I', there are only three arrays in here - the third cube doesn't move (unless wall kicked)
         * so the third cube data is added programitcally in 'addThirdCubeRotateCoordinates'
         * I rotates differently as all cubes get moved (it pivots on a different position see - https://tetris.fandom.com/wiki/SRS?file=SRS-pieces.png)
         */
        this.rotateMovementCoordinates = {
            I: [
                [[2, -1], [1, 0], [0, 1], [-1, 2]],
                [[1, 2], [0, 1], [-1, 0], [-2, -1]],
                [[-2, 1], [-1, 0], [0, -1], [1, -2]],
                [[-1, -2], [0, -1], [1, 0], [2, 1]]
            ],
            T: [
                [[1, 1], [1, -1], [-1, 1]],
                [[-1, 1], [1, 1], [-1, -1]],
                [[-1, -1], [-1, 1], [1, -1]],
                [[1, -1], [-1, -1], [1, 1]]
            ],
            L: [
                [[0, 2], [-1, 1], [1, -1]],
                [[-2, 0], [-1, -1], [1, 1]],
                [[0, -2], [1, -1], [-1, 1]],
                [[2, 0], [1, 1], [-1, -1]]
            ],
            J: [
                [[2, 0], [1, -1], [-1, 1]],
                [[0, 2], [1, 1], [-1, -1]],
                [[-2, 0], [-1, 1], [1, -1]],
                [[0, -2], [-1, -1], [1, 1]]
            ],
            S: [
                [[0, 2], [1, 1], [1, -1]],
                [[-2, 0], [-1, 1], [1, 1]],
                [[0, -2], [-1, -1], [-1, 1]],
                [[2, 0], [1, -1], [-1, -1]]
            ],
            Z: [
                [[2, 0], [1, 1], [-1, 1]],
                [[0, 2], [-1, 1], [-1, -1]],
                [[-2, 0], [-1, -1], [1, -1]],
                [[0, -2], [1, -1], [1, 1]]
            ]
        }

        // data comes from https://tetris.fandom.com/wiki/SRS
        this.wallKicks = {
            'JLTSZ': [ // first test if no offSet as this is just the basic rotation coordinates
                [[0, 0], [-1, 0], [-1, 1], [0, -2] , [-1, -2]], // positionState 0 (0>>1)
                [[0, 0], [1, 0], [1, -1], [0, 2] , [1, 2]], // positionState 1 (1>>2)
                [[0, 0], [1, 0], [1, 1], [0, -2] , [1, -2]], // positionState 2 (2>>3)
                [[0, 0], [-1, 0], [-1, -1], [0, 2] , [-1, 2]] // positionState 3 (3>>0)
            ],
            'I': [
                [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
                [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
                [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
                [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]]
            ]
        }

        // maps the shape to the wall kick
        this.wallKickMaps = {
            I: 'I',
            J: 'JLTSZ',
            L: 'JLTSZ',
            T: 'JLTSZ',
            S: 'JLTSZ',
            Z: 'JLTSZ'
        }

        // rows cleared at a time
        this.scores = [100, 300, 500, 800]
    }

    init() {
        this.addThirdCubeRotateCoordinates();
        this.setGrid();
        this.shape = new Shape();
    }

    /**
     * add cube 3 position data for every shape (these don't move so it's [0, 0]) but 'I'
     * do this here as didn't want to hard code these into the rotateMovementCoordinates
     */
    addThirdCubeRotateCoordinates() {
        for (let key in this.rotateMovementCoordinates) {
            if (key === 'I') {
                continue
            }

            for (const coordinates of this.rotateMovementCoordinates[key]) {
                coordinates.splice(2, 0, [0, 0])
            }
        }
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
            line(xCoor, 0, xCoor, this.height); // line(x1, y1, x2, y2)
        });

        this.gridCoordinates.y.forEach(yCoor => {
            // line(0, yCoor, width, width); // cool pattern
            line(0, yCoor, this.width, yCoor); // line(x1, y1, x2, y2)
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
                    ++this.currentLeveleRowsDeleted;
                    rowsToDelete.push(this.cubes[i].coordinates.y);
                }
            } else {
                numberOfXPositions[this.cubes[i].coordinates.y] = 1;
            }
        }

        // calc score
        this.calculateScore(rowsToDelete.length)
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

                if (flashDetails.x > this.width) {
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
        this.calculateLevel();
        this.shape = new Shape();
    }

    show() {
        this.shape.show(); // display the shape
        this.cubes.forEach(cube => cube.show()); // display all the cubes that have landed
    }

    calculateLevel() {
        // level up by clearing [current level] * 10 lines
        // source - https://www.reddit.com/r/Tetris/comments/ksjnnb/what_is_the_leveling_system_in_tetris/
        const rowsToDelete = this.level * 10;
        if (this.currentLeveleRowsDeleted >= rowsToDelete) {
            this.level++;
            this.currentLeveleRowsDeleted -= rowsToDelete;
        }
    }

    calculateScore(rowsDeletedThisRound) {
        if (!rowsDeletedThisRound) {
            this.rowsDeletedLastRound = rowsDeletedThisRound;
            return;
        }

        let multiplier = 1;
        if (rowsDeletedThisRound === 4 && this.rowsDeletedLastRound === 4) {
            multiplier = 1.5;
        }

        this.score += this.scores[rowsDeletedThisRound - 1] * multiplier;
        this.rowsDeletedLastRound = rowsDeletedThisRound;
    }
}
