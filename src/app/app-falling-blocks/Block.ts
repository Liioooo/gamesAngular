import * as p5 from 'p5';
import {P5JsHelpers} from '../P5JsHelpers';

export class Block {

    private p: any;
    public pX: number;
    public pY: number;
    private numberOfBlocks: number;
    private fallSpeed: number;
    private baseFallSpeed: number;

    constructor(p: any, positionX: number, numberOfBlocks: number, baseFallSpeed: number) {
        this.p = p;
        this.pX = positionX;
        this.baseFallSpeed = baseFallSpeed;
        this.numberOfBlocks = numberOfBlocks;
        this.pY = -200 - Math.random() * 900;
        this.fallSpeed = this.baseFallSpeed + Math.random() * 400;
    }

    paint() {
        this.p.fill('#007bff');
        this.p.rect((this.p.width/this.numberOfBlocks) * this.pX, this.pY, (this.p.width/this.numberOfBlocks), 40);
    }

    fall() {
        this.pY += this.fallSpeed/P5JsHelpers.getFrameRate();
        this.checkOutOfCanvas();
    }

    checkOutOfCanvas() {
        if(this.pY > this.p.height) {
            this.pY = -200 - Math.random() * 300;
            this.fallSpeed = this.baseFallSpeed + Math.random() * 400;
        }
    }

    increaseBaseFallSpeed() {
        this.baseFallSpeed += 9;
    }
}