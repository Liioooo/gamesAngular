import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Player } from './Player';
import * as p5 from 'p5';
import {Block} from './Block';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-falling-blocks',
  templateUrl: './app-falling-blocks.component.html',
  styleUrls: ['./app-falling-blocks.component.css']
})
export class AppFallingBlocksComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("fallingBlockCanvas") fallingBlockCanvas: ElementRef;
  public p5;

  constructor(public auth: AuthService) {
      window.onresize = this.onWindowResize;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
      this.destroyCanvas();
  }

  ngAfterViewInit() {
      this.createCanvas();
  }

  private createCanvas = () => {
      let sketch = this.defineSketch(this.fallingBlockCanvas.nativeElement.offsetWidth);
      this.p5 = new p5(sketch);
  };

  private destroyCanvas = () => {
      this.p5.noCanvas();
  };

  private onWindowResize = (e) => {
      this.p5.resizeCanvas(this.fallingBlockCanvas.nativeElement.offsetWidth, 600);

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

  public startGame() {
      this.p5.initBlocks();
      this.p5.gameState = 1;
      this.p5.score = 0;
      this.p5.player.setMiddle();
      this.p5.scoreCounterIntervall = setInterval(() => {this.p5.score++}, 800);
  }


  private defineSketch(width) {

    return function (p: any) {

        const numberOfBlocks = 5;
        let blocks = [];
        p.score = 0;
        p.gameState = 0; //0> noGame, 1> running 2> finished

        p.setup = () => {
            p.createCanvas(width, 600).parent('falling-block-canvas');
            p.frameRate(60);

            p.player = new Player(p, Math.floor(numberOfBlocks/2), p.height-75, numberOfBlocks);
            p.initBlocks();
        };

        p.draw = () => {
            p.background(255);
            p.noStroke();
            switch (p.gameState) {
                case 0:
                    paintBlocks();
                    fallBlocks();
                    break;
                case 1:
                    paintBlocks();
                    fallBlocks();
                    p.player.paint();
                    checkCollision();
                    break;
                case 2:
                    paintBlocks();
                    fallBlocks();
                    break;
            }
        };

        p.initBlocks = () => {
            for (let i = 0; i < numberOfBlocks; i++) {
                blocks[i] = new Block(p, i, 5)
            }
        };

        function paintBlocks() {
            blocks.forEach(block => {
               block.paint();
            });
        }

        function fallBlocks() {
            blocks.forEach(block => {
                block.fall();
            });
        }

        function checkCollision() {
            blocks.forEach(block => {
                if(p.player.checkCollision(block)) {
                    endGame();
                }
            });
        }

        function endGame() {
            p.gameState = 2;
            clearInterval(p.scoreCounterIntervall);
        }

        p.keyPressed = () => {
            if (p.keyCode === p.LEFT_ARROW) {
                p.player.moveLeft();
            } else if (p.keyCode === p.RIGHT_ARROW) {
                p.player.moveRight();
            }
        };
    }
  }

}
