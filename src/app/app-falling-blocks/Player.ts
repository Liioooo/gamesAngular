import {Block} from './Block';

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
        this.p.fill('#343a40');
        this.p.rect((this.p.width/this.numberOfBlocks) * this.positionX, this.positionY, (this.p.width/this.numberOfBlocks), 50);
    }

    moveLeft() {
        if(this.positionX > 0) {
            this.positionX--;
        }
    }

    moveRight() {
        if(this.positionX < this.numberOfBlocks - 1) {
            this.positionX++;
        }
    }

    checkCollision(block: Block) {
        return block.positionY + 38 >= this.positionY && block.positionX === this.positionX;
    }

    setMiddle() {
        this.positionX = Math.floor(this.numberOfBlocks/2);
    }
}