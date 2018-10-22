import * as p5 from 'p5';

export class Block {

    private p: any;
    private positionX: number;
    private positionY: number;
    private numberOfBlocks: number;

    constructor(p: any, positionX: number, numberOfBlocks: number) {
        this.p = p;
        this.positionX = positionX;
        this.numberOfBlocks = numberOfBlocks;
        this.positionY = 0;
    }

    paint() {
        this.p.rect((this.p.width/this.numberOfBlocks) * this.positionX, this.positionY, (this.p.width/this.numberOfBlocks), 100);
    }

}