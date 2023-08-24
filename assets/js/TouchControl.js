'use strict';

class TouchControl {
    constructor() {
        this.dragX = {};
        this.dragY = {
            slamFrames: 10, // speed that user has to drag downwards to slam (in frames)
            speedUpFrames: 20
        }
        this.init();
    }

    init() {
        this.setDragX();
        this.setDragY();
    }

    setDragX() {
        this.dragX.method = null;
        this.dragX.multiplier = 0;
        this.dragX.distance = false;
        this.dragX.frameCount = 0;
    }

    setDragY() {
        this.dragY.startPoint = false;
        this.dragY.speedMovement = false;
        this.dragY.distance = 0;
        this.dragY.slamMovementIndex = 0;
        this.dragY.speedUpMovementIndex = 0;
        this.dragY.movementPoints = [];
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
    trackDragX() {
        if (this.dragX.distance === false) {
            this.dragX.distance = mouseX;
        }

        const movedBy = Global.shape.speedMovingDownwards ? 60 : 40 // make more sensitive when speeding downwards
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
    setDragXPerFrame() {
        if (!this.dragX.multiplier || Global.shape.slammed) {
            return;
        }

        if (this.dragX.frameCount % 2 === 0) {
            Global.shape[this.dragX.method]()
            this.dragX.multiplier--;
        }
        this.dragX.frameCount++;
    }

    /**
     * track the distance between first dragged click and the current mouseY Pos
     * called on every dragged event
     */
    trackDragY() {
        if (this.dragY.startPoint === false) {
            this.dragY.startPoint = mouseY;
        }

        this.dragY.distance = mouseY - this.dragY.startPoint;
    }

    /**
     * track the position of the distance - called on every frame
     * notice how this is separate to the above - we want to track on every frame
     * the dragged funciton appears to track twice as quick but not consistantly
     * by tracking on every frame we're keeping things consistent and can thus quantify the movement more accurately
     */
    trackDragYPerFrame() {
        this.dragY.movementPoints.push(this.dragY.distance);
    }

    /**
     * perform callback when the finger/mouse has been dragged down the specified distance within the specified time [in frames]
     * @param {number} frames - number of frames to wait
     * @param {number} distance - number of pixels the finger has to have moved
     */
    testDragYSpeed(frames, distance, callback, movementPointIndex) {
        const { movementPoints } = this.dragY;
        if (movementPoints.length < frames ||
            Global.shape.speedMovingDownwards ||
            Global.shape.slammed) {
            return false;
        }

        // console.log(`${this.dragY[movementPointIndex] + (frames - 1)}: ${movementPoints[this.dragY[movementPointIndex] + (frames - 1)]}`)
        // console.log(`${this.dragY[movementPointIndex]}: ${movementPoints[this.dragY[movementPointIndex]]}`)
        if (movementPoints[this.dragY[movementPointIndex] + (frames - 1)] - movementPoints[this.dragY[movementPointIndex]] >= distance) {
            callback();
        }

        this.dragY[movementPointIndex]++;
    }

    setDragYPerFrame() {
        if (this.dragY.startPoint === false) {
            return;
        }

        this.trackDragYPerFrame();
        this.testDragYSpeed(this.dragY.slamFrames, 250, Global.shape.slam.bind(Global.shape), 'slamMovementIndex')
        this.testDragYSpeed(this.dragY.speedUpFrames, 110, Global.shape.speedDownwards.bind(Global.shape), 'speedUpMovementIndex')
    }
}
