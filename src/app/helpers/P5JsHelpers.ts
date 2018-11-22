export class P5JsHelpers {

    private static lastFramerates;

    static initFrameRateAvg() {
        this.lastFramerates = new Array(10).fill(0);
    }

    static updateFrameRateAvg(p5: any) {
        this.lastFramerates.shift();
        this.lastFramerates.push(p5.frameRate());
    }

    static getFrameRate(): number {
        let avg = 0;
        this.lastFramerates.forEach(element => {
            avg += element;
        });
        return avg / this.lastFramerates.length;
    }

    static convertSpeedToFpsSpeed(p5: any, speed: number): number  {
        if(this.getFrameRate() !== 0) {
            return speed / this.getFrameRate();
        }
        return 0;
    }
}