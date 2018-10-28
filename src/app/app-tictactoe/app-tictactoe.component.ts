import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {P5JsHelpers} from '../P5JsHelpers';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './app-tictactoe.component.html',
  styleUrls: ['./app-tictactoe.component.css']
})
export class AppTictactoeComponent implements AfterViewInit, OnDestroy {

    @ViewChild("ticTacToeCanvas") tictavToeCanvas: ElementRef;
    public p5;

    private gameID: number = 2;

    constructor() {
        window.onresize = this.onWindowResize;
    }

    ngAfterViewInit() {
        this.createCanvas();
    }

    ngOnDestroy() {
        this.destroyCanvas();
    }

    private createCanvas = () => {
        let sketch = this.defineSketch(this.getSizeForCanavs());
        this.p5 = new p5(sketch);
    };

    private destroyCanvas = () => {
        this.p5.noCanvas();
    };

    private onWindowResize = (e) => {
      let newSize = this.getSizeForCanavs();
        this.p5.resizeCanvas(newSize, newSize);
        if(this.p5.height < 700) {
            this.tictavToeCanvas.nativeElement.style.height = 'unset';
        } else {
            this.tictavToeCanvas.nativeElement.style.height = '700px';
        }

    };

    private getSizeForCanavs(): number {
      if(this.tictavToeCanvas.nativeElement.offsetWidth > this.tictavToeCanvas.nativeElement.offsetHeight) {
          return this.tictavToeCanvas.nativeElement.offsetHeight
      } else {
        return this.tictavToeCanvas.nativeElement.offsetWidth;
      }
    }

    public gameNotRunning(): boolean {
        if (typeof this.p5 === 'undefined') {
            return true;
        }
        if (typeof this.p5.gameState === 'undefined') {
            return true;
        }
        return this.p5.gameState !== 1;
    }

    public gameEnded(): boolean {
        if (typeof this.p5 === 'undefined') {
            return false;
        }
        if (typeof this.p5.gameState === 'undefined') {
            return false;
        }
        return this.p5.gameState === 2;
    }

    startGame() {

    }

    @HostListener('document:mousedown', ['$event'])
    handleClick(event: MouseEvent) {

    }

    private defineSketch(height: number) {

        return function (p: any) {

            p.setup = () => {
                p.createCanvas(height, height).parent('ticTacToe-canvas');
                p.frameRate(60);
                P5JsHelpers.initFrameRateAvg();

                p.gameState = 0; //0>noGame 1>running  2>finished
            };

            p.draw = () => {
                P5JsHelpers.updateFrameRateAvg(p);
                p.background(255);
                drawLines();
            };

            function drawLines() {
                p.line(0, p.height/3, p.width, p.height/3);
                p.line(0, p.height*2/3, p.width, p.height*2/3);
                p.line(p.width/3, 0,p. width/3, p.height);
                p.line(p.width*2/3, 0, p.width*2/3, p.height);
            }

        }
    }
}


