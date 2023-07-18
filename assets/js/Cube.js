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
        fill(this.colour);
        stroke('rgb(255, 204, 0)');
        rect(this.coordinates.x, this.coordinates.y, Global.scl, Global.scl, Global.rectBorderRadius);
    }

    setCoordinates(xn, yn) {
        this.coordinates.x += xn;
        this.coordinates.y += yn;
    }
}