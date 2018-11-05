import {P5JsHelpers} from '../P5JsHelpers';

export class Pipe {

    private p: any;
    private pX: number;
    private pY: number;
    private unitsOnScreen: number;
    private speed: number = 240;
    public gotPoint: boolean = false;

    constructor(p: any, pX: number, pY: number, unitsOnScreen: number) {
        this.p = p;
        this.pX = pX;
        this.pY = pY;
        this.unitsOnScreen = unitsOnScreen;
    }

    private mapToCanvasSizeX(toMap: number) {
        return this.p.map(toMap, 0, this.unitsOnScreen, 0, this.p.width);
    }

    paint() {
        this.p.fill('#007bff');
        this.p.rect(this.mapToCanvasSizeX(this.pX), 0, this.mapToCanvasSizeX(50), this.p.mapToCanvasSizeY(this.pY - 200));
        this.p.rect(this.mapToCanvasSizeX(this.pX), this.p.mapToCanvasSizeY(this.pY), this.mapToCanvasSizeX(50), this.p.mapToCanvasSizeY(650 - this.pY));
    }

    move() {
        if(P5JsHelpers.getFrameRate() < 20) return;
        this.pX -= P5JsHelpers.convertSpeedToFpsSpeed(this.p, this.speed);
    }

    outOfScreen(): boolean {
        return this.pX < -50;
    }

    get getPX(): number {
        return this.pX;
    }

    get getPY(): number {
        return this.pY;
    }
}