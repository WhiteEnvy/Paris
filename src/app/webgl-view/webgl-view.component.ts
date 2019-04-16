import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import SceneManager from './webgl/index';
import Global from './webgl/global';
import { GameService } from '../services/game.service';

@Component({
  selector: 'webgl-view',
  templateUrl: './webgl-view.component.html',
  styleUrls: ['./webgl-view.component.scss']
})
export class WebglViewComponent implements OnInit {
  @ViewChild("canvasContainer")
  private canvasRef: ElementRef;

  constructor(private gs: GameService) { }

  private get container(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit() {
    SceneManager.init(this.container);
    Global.gameService = this.gs;
  }

}
