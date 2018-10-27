import {P5JsHelpers} from '../P5JsHelpers';

export class Pipe {

    private p: any;
    private pX: number;
    private pY: number;
    private unitsOnScreen: number;
    private speed: number = 200;
    public gotPoint: boolean = false;

    constructor(p: any, pX: number, pY: number, unitsOnScreen: number) {
        this.p = p;
        this.pX = pX;
        this.pY = pY;
        this.unitsOnScreen = unitsOnScreen;
    }

    private mapToScreenSize(toMap: number) {
        return this.p.map(toMap, 0, this.unitsOnScreen, 0, this.p.width);
    }

    paint() {
        this.p.fill('#007bff');
        this.p.rect(this.mapToScreenSize(this.pX), 0, this.mapToScreenSize(50), this.pY - 200);
        this.p.rect(this.mapToScreenSize(this.pX), this.pY, this.mapToScreenSize(50), this.p.height - this.pY);
    }

    move() {
        if(P5JsHelpers.getFrameRate() < 20) return;
        this.pX -= this.speed/P5JsHelpers.getFrameRate();
    }

    increaseSpeed() {
        this.speed += 8;
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