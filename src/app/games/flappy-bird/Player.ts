import {P5JsHelpers} from '../../helpers/P5JsHelpers';
import {Pipe} from './Pipe';

export class Player {

    private p: any;
    private pX: number;
    private pY: number;
    private fallSpeed: number;
    private unitsOnScreen: number;

    constructor(p: any, pX: number, pY: number, unitsOnScreen: number) {
        this.p = p;
        this.pX = pX;
        this.pY = pY;
        this.unitsOnScreen = unitsOnScreen;
        this.p.ellipseMode(this.p.CENTER);
        this.fallSpeed = 0;
    }

    private mapCanavasSizeX(toMap: number) {
        return this.p.map(toMap, 0, this.unitsOnScreen, 0, this.p.width);
    }

    paint() {
        this.p.fill('#343a40');
        this.p.ellipse(this.mapCanavasSizeX(this.pX), this.p.mapToCanvasSizeY(this.pY), this.mapCanavasSizeX(50), this.p.mapToCanvasSizeY(50));
    }

    fall() {
        if(this.pY <= 625) {
            this.fallSpeed += P5JsHelpers.convertSpeedToFpsSpeed(this.p, 25);
            this.pY += this.fallSpeed;
        } else if(this.fallSpeed < 0) {
            this.pY += this.fallSpeed;
        }
        if(this.pY < 25) {
            this.pY = 25;
            this.fallSpeed = 0;
        }
    }

    setMiddle() {
        this.pY = 650/2;
    }

    jump() {
        this.fallSpeed = P5JsHelpers.convertSpeedToFpsSpeed(this.p, -500);
    }

    checkCollison(pipe: Pipe) {
        return ((this.p.dist(pipe.getPX, 0, this.pX, 0) <= 25 || this.p.dist(pipe.getPX+50, 0, this.pX, 0)) <= 25 && (this.pY - 25 <= pipe.getPY - 200 || this.pY + 25 >= pipe.getPY));
    }

    checkPoint(pipe: Pipe): boolean {
        if((this.p.dist(pipe.getPX+25, 0, this.pX, 0) <= 25) && !pipe.gotPoint ) {
            pipe.gotPoint = true;
            return true;
        }
        return false;
    }
}