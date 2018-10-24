import {Block} from './Block';

export class Player {

    private p: any;
    private pY: number;
    private pX: number;
    private numberOfBlocks: number;

    constructor(p: any, positionX: number, positionY: number, numberOfBlocks: number) {
        this.p = p;
        this.pX = positionX;
        this.numberOfBlocks = numberOfBlocks;
        this.pY = positionY;
    }

    paintPlayer() {
        this.p.fill('#343a40');
        this.p.rect((this.p.width/this.numberOfBlocks) * this.pX, this.pY, (this.p.width/this.numberOfBlocks), 50);
    }

    moveLeft() {
        if(this.pX > 0) {
            this.pX--;
        }
    }

    moveRight() {
        if(this.pX < this.numberOfBlocks - 1) {
            this.pX++;
        }
    }

    checkCollision(block: Block) {
        return block.pY + 38 >= this.pY && block.pX === this.pX;
    }

    setMiddle() {
        this.pX = 2;
    }

    getPositionDestroyd(): object {
        return {
            pX: (this.p.width/this.numberOfBlocks) * this.pX + (this.p.width/this.numberOfBlocks)/2,
            pY: this.pY
        }
    }
}