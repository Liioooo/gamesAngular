import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {ScoreService} from '../score.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-flappy-bird',
  templateUrl: './flappy-bird.component.html',
  styleUrls: ['./flappy-bird.component.css']
})
export class FlappyBirdComponent implements OnDestroy, AfterViewInit {

  @ViewChild("flappyBirdCanvas") flappyBirdCanvas: ElementRef;
  public p5;

  private gameID: number = 1;

  constructor(private scoreService: ScoreService, public auth: AuthService) {
      window.onresize = this.onWindowResize;
  }

    ngAfterViewInit() {
        this.createCanvas();
    }

    ngOnDestroy() {
        this.destroyCanvas();
        clearInterval(this.p5.scoreCounterIntervall);
    }

    private createCanvas = () => {
        let sketch = this.defineSketch(this.flappyBirdCanvas.nativeElement.offsetWidth, this.scoreService, this.auth, this.gameID);
        this.p5 = new p5(sketch);
    };

    private destroyCanvas = () => {
        this.p5.noCanvas();
    };

    private onWindowResize = (e) => {
        this.p5.resizeCanvas(this.flappyBirdCanvas.nativeElement.offsetWidth, 600);

    };

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

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {

    }

    private defineSketch(width: number, scoreService: ScoreService, auth: AuthService, gameID: number) {

        return function (p: any) {

            p.setup = () => {
                p.createCanvas(width, 600).parent('flappy-bird-canvas');
                p.frameRate(60);

                p.gameState = 0; //0>noGame 1>running 2>endAnimation 3>finished
            };

            p.draw = () => {
                p.background(255);
            };
        }

    }
}
