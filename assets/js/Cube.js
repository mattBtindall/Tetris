'use strict';

class Cube {
    constructor(spec) {
        const { x, y, colour, shadowColour, shape } = spec;
        this.shape = shape;
        this.coordinates = createVector(x, y);
        this.colour = colour;
        this.yspeedMultiplier = 1;
        this.yStop = false;
        this.shadow = {
            coordinates: createVector(this.coordinates.x, height - Global.scl),
            colour: shadowColour
        }
        this.fillColour = this.colour;
    }

    collideY() {
        if (this.coordinates.y >= height - Global.scl) return true; // see if hit the bottom

        for (const cube of Global.cubes) { // see if landed ontop of another cube
            if (this.coordinates.x === cube.coordinates.x && this.coordinates.y === cube.coordinates.y - Global.scl)
                return true;
        }

        return false;
    }

    moveY() {
        this.coordinates.y += Global.scl * this.yspeedMultiplier;
    }

    // moving left
    collideLeft() {
        if (this.coordinates.x <= 0) return true; // hit side

        for (const cube of Global.cubes) { // hit another cube
            if (
                this.coordinates.x === cube.coordinates.x + Global.scl &&
                this.coordinates.y >= cube.coordinates.y &&
                this.coordinates.y <= cube.coordinates.y + (Global.scl - 1)
            )
                return true;
        }
    }

    // moving right
    collideRight() {
        if (this.coordinates.x >= width - Global.scl) return true; // hit side

        for (const cube of Global.cubes) { // hit another cube
            if (
                this.coordinates.x === cube.coordinates.x - Global.scl &&
                this.coordinates.y >= cube.coordinates.y &&
                this.coordinates.y <= cube.coordinates.y + (Global.scl - 1)
            )
                return true;
        }
    }

    moveX(direction) {
        this.coordinates.x += direction;
    }

    showShadow() {
        fill(this.shadow.colour);
        stroke('rgb(255, 204, 0)');
        strokeWeight(.5);
        rect(this.shadow.coordinates.x, this.shadow.coordinates.y, Global.scl, Global.scl, Global.rectBorderRadius);
    }

    show() {
        fill(this.fillColour);
        stroke('rgb(255, 204, 0)');
        rect(this.coordinates.x, this.coordinates.y, Global.scl, Global.scl, Global.rectBorderRadius);
    }

    setCoordinates(xn, yn) {
        this.coordinates.x += (xn * Global.scl);
        this.coordinates.y += (yn * Global.scl);
    }

    // rotating
    collide({x, y}) {
        if (x < 0 || x >= width || y >= height) {
            return true
        }

        // can't just use y === stackCube.y
        // if cube starts to move downwards one, then we rotate y no longer is equal to stackCube.y
        // it's in between
        for (const stackCube of Global.cubes) {
            if (x === stackCube.coordinates.x &&
                y >= stackCube.coordinates.y &&
                y <= stackCube.coordinates.y + (Global.scl - 1)) {
                return true
            }
        }

        return false
    }

    getOffsetCoordinates(xn, yn) {
        return createVector(
            this.coordinates.x + (xn * Global.scl),
            this.coordinates.y + (yn * Global.scl)
        );
    }

    canRotate(xn, yn) {
        const offsetCoordindates = this.getOffsetCoordinates(xn, yn);
        const collide = this.collide(offsetCoordindates);
        if (!collide) {
            return true
        }

        return false
    }

    /**
     * used to reset colour after flash
     * need to be sure it gets reset if not the whole shape can't be seen
     */
    resetColour() {
        this.fillColour = this.colour;
    }

    flash() {
        this.fillColour = this.fillColour !== Global.backgroundColour ? Global.backgroundColour : this.colour;
    }
}
