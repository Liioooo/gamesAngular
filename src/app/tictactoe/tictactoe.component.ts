import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {NeuralNet} from './NeuralNet';
import {AuthService} from '../auth.service';
import {NavbarCollapsedService} from '../navbar-collapsed.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements AfterViewInit, OnDestroy {

    public p5;

    private gameID: number = 2;

    constructor(public collapsed: NavbarCollapsedService) {
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
    };

    private getSizeForCanavs(): number {
      return window.innerHeight < window.innerWidth ? window.innerHeight - 230 : window.innerWidth - 90;
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

    public loadedModel() {
        if (typeof this.p5 === 'undefined') {
            return false;
        }
        if (typeof this.p5.loadedModel === 'undefined') {
            return false;
        }
        return this.p5.loadedModel;
    }

    startGame() {
        if(this.loadedModel()) {
            this.p5.initGrid();
            this.p5.gameState = 1;
            this.p5.playsInCurrentGame = 0;
            this.p5.currentPlayer = Math.random() < 0.5 ? 1 : -1;
        }
    }

    private defineSketch(height: number) {

        return function (p: any) {

            p.setup = () => {
                p.loadedModel = false;
                p.neuralNet = new NeuralNet();
                p.neuralNet.load().then(res => {
                    console.log("loaded tfjs Model TicTacToe");
                    p.loadedModel = true;
                });

                p.createCanvas(height, height).parent('ticTacToe-canvas');
                p.frameRate(60);

                p.gameResult = '';
                p.gameState = 0; //0>noGame 1>running  2>finished
                p.currentPlayer = 0;
                p.playsInCurrentGame = 0;
                p.grid = [];

                p.initGrid();
            };

            p.draw = () => {
                p.background(255);
                drawLines();
                if(p.gameState === 1) {
                    if(p.currentPlayer === 1 && p.mouseIsPressed) {
                        let y = Math.floor(p.map(p.mouseX, 0, p.width, 0, 3));
                        let x = Math.floor(p.map(p.mouseY, 0, p.height, 0, 3));
                        if(x > 2 || y > 2)
                            return;
                        if(p.grid[x][y] === 0) {
                            p.grid[x][y] = 1;
                            finishMove();
                        }
                    } else if(p.currentPlayer === -1) {
                        let output = p.neuralNet.predict(p.grid).dataSync();
                        let i = 0;
                        while (i < 9) {
                            i++;
                            let maxIndex = output.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
                            if(p.grid[Math.floor(maxIndex / 3)][maxIndex % 3] === 0) {
                                p.grid[Math.floor(maxIndex / 3)][maxIndex % 3] = -1;
                                finishMove();
                                break;
                            }
                        }
                    }
                }
                if(p.gameState === 1 || p.gameState === 2) {
                    drawGrid();
                }

            };

            p.initGrid = () => {
                for(let i = 0; i < 3; i++) {
                    p.grid[i] = Array(3).fill(0);
                }
            };

            function drawLines() {
                p.line(0, p.height/3, p.width, p.height/3);
                p.line(0, p.height*2/3, p.width, p.height*2/3);
                p.line(p.width/3, 0,p. width/3, p.height);
                p.line(p.width*2/3, 0, p.width*2/3, p.height);
            }

            function drawGrid() {
                p.textSize(100);
                p.textAlign(p.CENTER, p.CENTER);
                for(let i = 0; i < p.grid.length; i++) {
                    for (let j = 0; j < p.grid[i].length; j++) {
                        switch (p.grid[i][j]) {
                            case 1:
                                p.fill('#ffc107');
                                p.text("X", (j+1) * p.width/3 - p.width/6, (i+1) * p.height/3 - p.height/6);
                                break;
                            case -1:
                                p.fill('#007bff');
                                p.text("O", (j+1) * p.width/3 - p.width/6, (i+1) * p.height/3 - p.height/6);
                                break;
                        }
                    }
                }
            }

            function finishMove() {
                p.playsInCurrentGame++;
                let winner = checkWinner();
                switch (winner) {
                    case 0:
                        p.currentPlayer *= -1;
                        if(p.playsInCurrentGame === 9) {
                            p.gameResult = 'Draw';
                            p.gameState = 2;
                        }
                        break;
                    case 1:
                        p.gameResult = 'You won!';
                        p.gameState = 2;
                        break;
                    case -1:
                        p.gameResult = 'You lost!';
                        p.gameState = 2;
                        break;
                }
            }

            function checkWinner() {
                for (let i = 0; i < 3; i++) {
                    let score1 = p.grid[i][0] + p.grid [i][1] + p.grid[i][2];
                    let score2 = p.grid[0][i] + p.grid [1][i] + p.grid[2][i];
                    if(score1 === 3 || score2 === 3)
                        return 1;
                    if(score1 === -3 || score2 === -3)
                        return -1;
                }
                let scoreV1 = p.grid[0][0] + p.grid[1][1] + p.grid[2][2];
                let scoreV2 = p.grid[0][2] + p.grid[1][1] + p.grid[2][0];
                if(scoreV1 === 3 || scoreV2 === 3)
                    return 1;
                if(scoreV1 === -3 || scoreV2 === -3)
                    return -1;
                return 0;
            }

        }
    }
}


