import * as p5 from 'p5';

export class Block {

    private p: any;
    public pX: number;
    public pY: number;
    private numberOfBlocks: number;
    private fallSpeed: number;

    constructor(p: any, positionX: number, numberOfBlocks: number) {
        this.p = p;
        this.pX = positionX;
        this.numberOfBlocks = numberOfBlocks;
        this.pY = -50 - Math.random() * 50;
        this.fallSpeed = 1 + Math.random() * 3.5;
    }

    paint() {
        this.p.fill('#007bff');
        this.p.rect((this.p.width/this.numberOfBlocks) * this.pX, this.pY, (this.p.width/this.numberOfBlocks), 40);
    }

    fall() {
        this.pY += this.fallSpeed;
        this.checkOutOfCanvas();
    }

    checkOutOfCanvas() {
        if(this.pY > this.p.height) {
            this.pY = -50 - Math.random() * 50;
            this.fallSpeed = 1 + Math.random() * 3.5;
        }
    }
}