import * as p5 from 'p5';

export class Block {

    private p: any;
    public positionX: number;
    public positionY: number;
    private numberOfBlocks: number;
    private fallSpeed: number;

    constructor(p: any, positionX: number, numberOfBlocks: number) {
        this.p = p;
        this.positionX = positionX;
        this.numberOfBlocks = numberOfBlocks;
        this.positionY = -50 - Math.random() * 50;
        this.fallSpeed = 1 + Math.random() * 3.5;
    }

    paint() {
        this.p.fill('#007bff');
        this.p.rect((this.p.width/this.numberOfBlocks) * this.positionX, this.positionY, (this.p.width/this.numberOfBlocks), 40);
    }

    fall() {
        this.positionY += this.fallSpeed;
        this.checkOutOfCanvas();
    }

    checkOutOfCanvas() {
        if(this.positionY > this.p.height) {
            this.positionY = -50 - Math.random() * 50;
            this.fallSpeed = 1 + Math.random() * 3.5;
        }
    }
}