import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {Player} from './Player';
import {Pipe} from './Pipe';
import {ApiService} from '../../services/api.service';
import {P5JsHelpers} from '../../helpers/P5JsHelpers';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-flappy-bird',
  templateUrl: './flappy-bird.component.html',
  styleUrls: ['./flappy-bird.component.css']
})
export class FlappyBirdComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild('flappyBirdCanvas') flappyBirdCanvas: ElementRef;
  public p5;

  private gameID = 1;

  constructor(public api: ApiService, private title: Title) {
      window.onresize = this.onWindowResize;
  }

    ngOnInit() {
      this.title.setTitle('LioGames - FlappyBird');
    }

    ngAfterViewInit() {
        this.createCanvas();
    }

    ngOnDestroy() {
        this.destroyCanvas();
        clearInterval(this.p5.scoreCounterIntervall);
    }

    private createCanvas = () => {
        const sketch = this.defineSketch(this.flappyBirdCanvas.nativeElement.offsetWidth, this.api, this.gameID);
        this.p5 = new p5(sketch);
    }

    private destroyCanvas = () => {
        this.p5.noCanvas();
    }

    private onWindowResize = (e) => {
        this.p5.resizeCanvas(this.flappyBirdCanvas.nativeElement.offsetWidth, window.innerHeight-280);

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
        this.p5.gameState = 1;
        this.p5.initPipes();
        this.p5.score = 0;
        this.p5.allHighscore = 'Loading...';
        this.p5.player.setMiddle();
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'w') {
            this.p5.player.jump();
        }
    }

    @HostListener('document:mousedown', ['$event'])
    handleClick(event: MouseEvent) {
        this.p5.player.jump();
    }

    private defineSketch(width: number, apiService: ApiService, gameID: number) {

        return function (p: any) {

            p.setup = () => {
                p.createCanvas(width, window.innerHeight-280).parent('flappy-bird-canvas');
                p.frameRate(60);
                P5JsHelpers.initFrameRateAvg();

                p.unitsOnScreen = 1200;
                p.gameState = 0; // 0>noGame 1>running 2>finished
                p.score = 0;

                p.allHighscore = 'Loading...';
                p.userHighscore = 'Loading...';

                p.pipes = [];
                p.player = new Player(p, 200, 650/2, p.unitsOnScreen);

                p.initPipes();
            };

            p.draw = () => {
                P5JsHelpers.updateFrameRateAvg(p);
                p.background(255);
                p.noStroke();
                switch (p.gameState) {
                    case 0:
                        p.paintMovePipes();
                        p.checkPipeOuside();
                        break;
                    case 1:
                        p.player.fall();
                        p.player.paint();
                        p.paintMovePipes();
                        p.checkPipeOuside();
                        p.checkCollisons();
                        break;
                    case 2:
                        p.paintMovePipes();
                        p.checkPipeOuside();
                        break;
                }
            };

            p.mapToCanvasSizeY = (toMap: number) => {
                return p.map(toMap, 0, 650, 0, p.height);
            };

            p.initPipes = () => {
                for (let i = 0; i < 6; i++) {
                    p.pipes[i] = new Pipe(p, 700 + 270 * i, p.random(220, 580), p.unitsOnScreen);
                }
            };

            p.paintMovePipes = () => {
                p.pipes.forEach(pipe => {
                    pipe.paint();
                    pipe.move();
                });
            };

            p.checkPipeOuside = () => {
                if (p.pipes[0].outOfScreen()) {
                    p.pipes.push(new Pipe(p, p.pipes[p.pipes.length - 1].getPX + 270, p.random(220, 580), p.unitsOnScreen));
                    p.pipes.shift();
                }
            };

            p.checkCollisons = () => {
                for (let i = 0; i < 2; i++) {
                    if (p.player.checkCollison(p.pipes[i])) {
                        p.endGame();
                    } else {
                        if (p.player.checkPoint(p.pipes[i])) {
                            p.score++;
                        }
                    }
                }
            };

            p.endGame = () => {
                p.gameState = 2;
                if (apiService.isAuthenticated()) {
                    apiService.saveHighscore(gameID, p.score)
                        .subscribe(data => {
                            p.allHighscore = data.allHighscore;
                            p.userHighscore = data.userHighscore;
                        });
                } else {
                    apiService.getHighScore(gameID).subscribe(data => {
                        p.allHighscore = data.allHighscore;
                    });
                }
            };

        };

    }
}
