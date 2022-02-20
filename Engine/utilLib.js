import {map, lerp, dist} from "./mathLib.js";

// A simple 2D camera system with the ability to pan, rotate, zoom, and multiple methods for tracking an object.
// An archive of older Camera versions can be found here: https://www.khanacademy.org/cs/cam30-prototype/5235534239055872
class Camera3 {
    constructor(x, y, z, r) {
        this.x = typeof x !== "number" ? width / 2 : x;
        this.y = typeof y !== "number" ? height / 2 : y;
        this.z = typeof z !== "number" ? 1 : z;
        this.r = typeof r !== "number" ? 0 : r;

        this.frames = [];
        this.active = 0;

        this.screenshots = [];

        /** [ ! WARNING ! ] **\
         *                   *
         *  Changing either  *
         *  of the max limit *
         *  variables may    *
         *  lead to browser  *
         *  memory overload  *
         *  (may crash your  *
         *  browser)         *
         *                   *
        \** [ ! WARNING ! ] **/
        // [DISCLAIMER]
        // I'm not responcible for any
        // damage, lost files, or
        // other loss that may be
        // caused by memory overload.

        this.maxVidFrames = 2250;
        this.maxScreenshots = 250;

        this.xv = 0;
        this.yv = 0;

        // Do not remove or edit any of the code below, since this is vital for error handling.
        this.warning = this.warning || false;
        this.status = "detecting...";
    }
    begin() {
        pushMatrix();
        translate(width / 2, height / 2);
        rotate(this.r);
        scale(this.z);
        translate(-width / 2, -height / 2);
        translate(-Math.round(this.x) + width / 2, -Math.round(this.y) + width / 2);
    }
    end() {
        popMatrix();
    }
    hardTrack(x, y) {
        this.x = x;
        this.y = y;
    }
    linearTrack(x, y, speedX, speedY) {
        if (this.x < x) {
            this.x += Math.min(speedX, Math.abs(this.x - x));
        } if (this.x > x) {
            this.x -= Math.min(speedX, Math.abs(this.x - x));
        }
        if (this.y < y) {
            this.y += Math.min(speedY, Math.abs(this.y - y));
        } if (this.y > y) {
            this.y -= Math.min(speedY, Math.abs(this.y - y));
        }
    }
    softTrack(x, y, s) {
        this.x = lerp(this.x, x, s);
        this.y = lerp(this.y, y, s);
    }
    velocityTrack(x, y, v, l) {
        if (this.x > x) {
            this.xv -= Math.min(v, Math.abs(this.x - x));
        }
        if (this.x < x) {
            this.xv += Math.min(v, Math.abs(this.x - x));
        }
        if (this.y > y) {
            this.yv -= Math.min(v, Math.abs(this.y - y));
        }
        if (this.y < y) {
            this.yv += Math.min(v, Math.abs(this.y - y));
        }

        this.xv = lerp(this.xv, Math.min(dist(this.x, this.y, x, y) / 50, this.xv), 0.5);
        this.yv = lerp(this.yv, Math.min(dist(this.x, this.y, x, y) / 50, this.yv), 0.5);

        this.x += this.xv;
        this.y += this.yv;

        this.x = lerp(this.x, x, l || 0.01);
        this.y = lerp(this.y, y, l || 0.01);
    }
    zoomTo(z, speed) {
        this.z = lerp(this.z, z, speed);
    }
    rotateTo(r, speed) {
        this.r = lerp(this.r, r, speed);
    }
}

//export default Camera3;

function cursor(type) {
    document.querySelector("canvas").style.cursor = type;
}

export {Camera3, cursor};