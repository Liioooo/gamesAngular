import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {ScoreService} from '../score.service';
import {AuthService} from '../auth.service';
import * as p5 from 'p5';
import {Coords} from './PixelCoordsInterface';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.css']
})
export class Connect4Component implements AfterViewInit, OnDestroy {

    @ViewChild('connect4Canvas') connect4Canvas: ElementRef;
    public p5;

    private gameID = 3;

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
        const sketch = this.defineSketch(this.connect4Canvas.nativeElement.offsetWidth, this.scoreService, this.auth, this.gameID);
        this.p5 = new p5(sketch);
    }

    private destroyCanvas = () => {
        this.p5.noCanvas();
    }

    private onWindowResize = (e) => {
        this.p5.resizeCanvas(this.connect4Canvas.nativeElement.offsetWidth, 650);

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
        this.p5.score = 0;
        this.p5.allHighscore = 'Laden...';
        this.p5.currentPlayer = 1;
        this.p5.initGrid();
    }

    @HostListener('document:mousedown', ['$event'])
    handleClick(event: MouseEvent) {
        if(this.p5.currentPlayer === 1) {
            const clickedX = Math.floor(this.p5.map(this.p5.mouseX, 0, this.p5.width, 0, 7));
            if(clickedX < 0 || clickedX > 6) return;
            for (let i = this.p5.grid[clickedX].length-1; i >= 0; i--) {
                if(this.p5.grid[clickedX][i] === 0) {
                    this.p5.grid[clickedX][i] = 1;
                    this.p5.finishMove();
                    return;
                }
            }
        }
    }

    private defineSketch(width: number, scoreService: ScoreService, auth: AuthService, gameID: number) {

        return function (p: any) {

            p.setup = () => {
                p.createCanvas(width, 650).parent('connect4-canvas');
                p.frameRate(60);

                p.unitsOnScreen = 1200;
                p.gameState = 0; // 0>noGame 1>running 2>finished
                p.score = 0;
                p.currentPlayer = 0;

                p.allHighscore = 'Laden...';
                p.userHighscore = 'Laden...';

                p.grid = [];
                p.initGrid();
            };

            p.draw = () => {
                p.background(255);
                if(p.gameState === 1) {
                    p.paintGrid();
                    p.paintLines();
                    if(p.currentPlayer === -1) {

                    }
                }
            };

            p.finishMove = () => {

            };

            p.mapToScreenSize = (x: number, y: number): Coords => {
                const pixelCoords = {x: null, y: null};
                pixelCoords.x = p.map(x, 0, 6, p.width/14, 13*p.width/14);
                pixelCoords.y = p.map(y, 0, 5, p.height/11, 10*p.height/11);
                return pixelCoords;
            };

            p.initGrid = () => {
                for(let i = 0; i < 7; i++) {
                    p.grid[i] = Array(6).fill(0);
                }
            };

            p.paintLines = () => {
              p.stroke(0);
                for (let i = 1; i < 7; i++) {
                  p.line(p.width/7*i, 0, p.width/7*i, p.height);
                }
            };

            p.paintGrid = () => {
              p.ellipseMode(p.CENTER);
              p.noStroke();
              const size = p.width -190 > p.height ? 100 : p.width/9;
                for (let i = 0; i < p.grid.length; i++) {
                    for (let j = 0; j < p.grid[i].length; j++) {
                        const coords = p.mapToScreenSize(i, j);
                        if(p.grid[i][j] === 1) {
                            p.fill('#007bff');
                            p.ellipse(coords.x, coords.y, size, size);
                        } else if(p.grid[i][j] === -1) {
                            p.fill('#ffc107');
                            p.ellipse(coords.x, coords.y, size, size);
                        }
                    }
                }
            }
        }

    }
}
