'use strict';

class TouchControl {
    constructor() {
        this.speedMovingDownwards  = false;
        this.dragX = {
            method: null,
            multiplier: 0,
            distance: false,
            frameCount: 0
        };
    }

    /**
     * first click - record the users mouseX position
     * track the distance between the start postion and the current position everytime it is dragged
     * round this number the closest 10 - if you don't do this, sometimes the mouse data can skip numbers
     * (if numbers are missed, it may miss the multiple in which the shape is suppose to move)
     * everytime the distance is equal to 40 (this is a multiple of Global.scl found through trial and error, the rounding to 10)
     * move the shape by Global.scl
     * when the user drags fast, the distance can be multiple 40, the shape is moved based on the number of multiples
     * rounding to 10 and the 40px movement was found through trial and error
    */
    draggedXEvent() {
        if (this.dragX.distance === false) {
            this.dragX.distance = mouseX;
        }

        const movedBy = this.speedMovingDownwards ? 40 : 30 // make more sensitive when speeding downwards
        const roundedDistance = Math.ceil((mouseX - this.dragX.distance) / 10) * 10;
        if (roundedDistance && roundedDistance % movedBy === 0) {
            this.dragX.method = roundedDistance < 0 ? 'moveSingleLeft' : 'moveSingleRight';
            this.dragX.multiplier += Math.abs(roundedDistance / movedBy);
            this.dragX.distance = mouseX;
        }
    }

    /**
     * slow down the movements of the cube when the user drags
     * if the shape movements are performed when the users drags fast
     * the shape jumps about - this is becuase when moving fast the shape can jump 5+ Global.scl at a time
     * the drag pressed function seems to track faster than draw does so this causes the shape to jump
     * this functions slow it down to 30 frames a second (every other frame)
    */
    setXPerFrame() {
        if (!this.dragX.multiplier || this.slammed) {
            return;
        }

        if (this.dragX.frameCount % 2 === 0) {
            Global.shape[this.dragX.method]()
            this.dragX.multiplier--;
        }
        this.dragX.frameCount++;
    }
}
