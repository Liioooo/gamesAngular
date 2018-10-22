import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Player } from './Player';

import * as p5 from 'p5';

@Component({
  selector: 'app-falling-blocks',
  templateUrl: './app-falling-blocks.component.html',
  styleUrls: ['./app-falling-blocks.component.css']
})
export class AppFallingBlocksComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("fallingBlockCanvas") fallingBlockCanvas: ElementRef;
  private p5;

  constructor() {
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
      this.p5.resizeCanvas(this.fallingBlockCanvas.nativeElement.offsetWidth, 500);

  };

  private defineSketch(width) {

    return function (p: any) {

        let player;

        p.setup = () => {
            p.createCanvas(width, 500).parent('falling-block-canvas');
            p.frameRate(60);

            player = new Player(p, 0, p.height-200, 5);
        };

        p.draw = () => {
            p.background(255);
            p.fill(0);
            player.paint();
        };
    }
  }

}
