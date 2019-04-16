import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { tryParse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private gs: GameService){
  }
}
