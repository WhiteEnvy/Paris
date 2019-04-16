import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebglViewComponent } from './webgl-view/webgl-view.component';
import { PreLoadingComponent } from './pre-loading/pre-loading.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    WebglViewComponent,
    PreLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
