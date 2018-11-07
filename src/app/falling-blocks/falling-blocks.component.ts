import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Player } from './Player';
import * as p5 from 'p5';
import {Block} from './Block';
import {ScoreService} from '../score.service';
import {AuthService} from '../auth.service';
import {P5JsHelpers} from '../P5JsHelpers';

@Component({
  selector: 'app-falling-blocks',
  templateUrl: './falling-blocks.component.html',
  styleUrls: ['./falling-blocks.component.css']
})
export class FallingBlocksComponent implements OnDestroy, AfterViewInit {

  @ViewChild("fallingBlockCanvas") fallingBlockCanvas: ElementRef;
  public p5;

  private gameID: number = 0;

  constructor(private scoreService: ScoreService, public auth: AuthService) {
      window.onresize = this.onWindowResize;
      document.onvisibilitychange = this.onVisibilityChange;
  }

  ngOnDestroy() {
      this.destroyCanvas();
      clearInterval(this.p5.scoreCounterIntervall);
  }

  ngAfterViewInit() {
      this.createCanvas();
  }

  private createCanvas = () => {
      const sketch = this.defineSketch(this.fallingBlockCanvas.nativeElement.offsetWidth, this.scoreService, this.auth, this.gameID);
      this.p5 = new p5(sketch);
  }

  private destroyCanvas = () => {
      this.p5.noCanvas();
  }

  private onWindowResize = (e) => {
      this.p5.resizeCanvas(this.fallingBlockCanvas.nativeElement.offsetWidth,  window.innerHeight-280);

  }

  private onVisibilityChange = (e) => {
      clearInterval(this.p5.scoreCounterIntervall);
      this.p5.gameState = 0;
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
      return this.p5.gameState === 2 || this.p5.gameState === 3;
  }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(this.p5.gameState == 1) {
            if (event.key === 'a') {
                this.p5.player.moveLeft();
            } else if (event.key === 'd') {
                this.p5.player.moveRight();
            }
        }
    }

  public startGame() {
      this.p5.initBlocks();
      this.p5.gameState = 1;
      this.p5.score = 0;
      this.p5.allHighscore = 'Laden...';
      this.p5.player.setMiddle();
      this.p5.scoreCounterIntervall = setInterval(() => {
          this.p5.score++;
          this.p5.blocks.forEach(block => {
              block.increaseBaseFallSpeed();
          })
      }, 800);
  }


  private defineSketch(width: number, scoreService: ScoreService, auth: AuthService, gameID: number) {

    let endAnimationPos = 0;

    return function (p: any) {

        p.setup = () => {
            p.createCanvas(width, window.innerHeight-280).parent('falling-block-canvas');
            p.frameRate(60);
            P5JsHelpers.initFrameRateAvg();

            p.allHighscore = 'Laden...';
            p.userHighscore = 'Laden...';

            p.numberOfBlocks = 6;
            p.blocks = [];
            p.score = 0;
            p.gameState = 0; //0>noGame 1>running 2>endAnimation 3>finished
            p.player = new Player(p, Math.floor(p.numberOfBlocks/2), 575, p.numberOfBlocks);
            p.initBlocks();

        };

        p.draw = () => {
            p.background(255);
            P5JsHelpers.updateFrameRateAvg(p);
            p.noStroke();
            switch (p.gameState) {
                case 0:
                    paintBlocks();
                    fallBlocks();
                    break;
                case 1:
                    paintBlocks();
                    fallBlocks();
                    checkCollision();
                    p.player.paintPlayer();
                    break;
                case 2:
                    paintBlocks();
                    fallBlocks();
                    p.player.paintPlayer();
                    paintEndAnimation();
                    break;
                case 3:
                    paintBlocks();
                    fallBlocks();
                    break;
            }
        };

        p.mapToCanvasSizeY = (toMap: number) => {
            return p.map(toMap, 0, 650, 0, p.height);
        };

        p.initBlocks = () => {
            for (let i = 0; i < p.numberOfBlocks; i++) {
                p.blocks[i] = new Block(p, i, 6, 150)
            }
        };

        function paintBlocks() {
            p.blocks.forEach(block => {
               block.paint();
            });
        }

        function fallBlocks() {
            p.blocks.forEach(block => {
                block.fall();
            });
        }

        function checkCollision() {
            p.blocks.forEach(block => {
                if(p.player.checkCollision(block)) {
                    endGame();
                }
            });
        }

        function endGame() {
            p.gameState = 2;
            endAnimationPos = 0;
            clearInterval(p.scoreCounterIntervall);
            if(auth.isAuthenticated()) {
                scoreService.saveHighscore(gameID, p.score)
                    .subscribe(data => {
                        p.allHighscore = data.allHighscore;
                        p.userHighscore = data.userHighscore
                    });
            } else {
                scoreService.getHighScore(gameID).subscribe(data => {
                        p.allHighscore = data.allHighscore;
                    });
            }
        }

        function paintEndAnimation() {
            let playerPos = p.player.getPositionDestroyd();
            endAnimationPos += 30;
            p.fill('#FF2A19');
            p.ellipse(playerPos.pX, p.mapToCanvasSizeY(playerPos.pY), endAnimationPos);
            if(endAnimationPos > p.width/p.numberOfBlocks + 50) {
                p.gameState = 3;
            }
        }

    }
  }

}
