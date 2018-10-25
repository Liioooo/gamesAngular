import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Player } from './Player';
import * as p5 from 'p5';
import {Block} from './Block';
import {ScoreService} from '../score.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-falling-blocks',
  templateUrl: './app-falling-blocks.component.html',
  styleUrls: ['./app-falling-blocks.component.css']
})
export class AppFallingBlocksComponent implements OnDestroy, AfterViewInit {

  @ViewChild("fallingBlockCanvas") fallingBlockCanvas: ElementRef;
  public p5;

  private gameID: number = 0;

  constructor(private scoreService: ScoreService, public auth: AuthService) {
      window.onresize = this.onWindowResize;
  }

  ngOnDestroy() {
      this.destroyCanvas();
      clearInterval(this.p5.scoreCounterIntervall);
  }

  ngAfterViewInit() {
      this.createCanvas();
  }

  private createCanvas = () => {
      let sketch = this.defineSketch(this.fallingBlockCanvas.nativeElement.offsetWidth, this.scoreService, this.auth, this.gameID);
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
      this.p5.scoreCounterIntervall = setInterval(() => {this.p5.score++}, 800);
  }


  private defineSketch(width: number, scoreService: ScoreService, auth: AuthService, gameID: number) {

    let endAnimationPos = 0;

    return function (p: any) {

        p.setup = () => {
            p.createCanvas(width, 600).parent('falling-block-canvas');
            p.frameRate(60);

            p.allHighscore = 'Laden...';
            p.userHighscore = 'Laden...';

            p.numberOfBlocks = 6;
            p.blocks = [];
            p.score = 0;
            p.gameState = 0; //0>noGame 1>running 2>endAnimation 3>finished
            p.player = new Player(p, Math.floor(p.numberOfBlocks/2), p.height-75, p.numberOfBlocks);
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

        p.initBlocks = () => {
            for (let i = 0; i < p.numberOfBlocks; i++) {
                p.blocks[i] = new Block(p, i, 6)
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
            p.ellipse(playerPos.pX, playerPos.pY, endAnimationPos);
            if(endAnimationPos > p.width/p.numberOfBlocks + 50) {
                p.gameState = 3;
            }
        }

    }
  }

}
