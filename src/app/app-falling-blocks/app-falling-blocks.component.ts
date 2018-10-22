import {Component, OnDestroy, OnInit} from '@angular/core';

import * as p5 from 'p5';

@Component({
  selector: 'app-falling-blocks',
  templateUrl: './app-falling-blocks.component.html',
  styleUrls: ['./app-falling-blocks.component.css']
})
export class AppFallingBlocksComponent implements OnInit, OnDestroy {

  private p5;

  constructor() { }

  ngOnInit() {
      this.createCanvas();
  }

  ngOnDestroy() {
      this.destroyCanvas();
  }

  private createCanvas = () => {
    this.p5 = new p5(this.drawing);
  };

  private destroyCanvas = () => {
    this.p5.noCanvas();
  };

  private drawing = function (p: any) {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('falling-block-canvas');
        p.frameRate(60);
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.rect(p.mouseX, p.mouseY, 100, 100);
    };

  }


}
