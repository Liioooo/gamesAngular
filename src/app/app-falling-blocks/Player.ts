import * as p5 from 'p5';

export class Player {

    private p: any;
    private positionX: number;
    private positionY: number;
    private numberOfBlocks: number;

    constructor(p: any, positionX: number, positionY: number, numberOfBlocks: number) {
        this.p = p;
        this.positionX = positionX;
        this.numberOfBlocks = numberOfBlocks;
        this.positionY = positionY;
    }

    paint() {
        this.p.rect((this.p.width/this.numberOfBlocks) * this.positionX, this.positionY, (this.p.width/this.numberOfBlocks), 100);
    }

    moveLeft() {
        if(this.positionX > 0) {
            this.positionX--;
        }
    }

    moveRight() {
        if(this.positionX < this.numberOfBlocks) {
            this.positionX++;
        }
    }
}