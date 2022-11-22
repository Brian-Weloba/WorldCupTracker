import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatchesComponent } from './components/matches/matches.component';
import { StandingsComponent } from './components/standings/standings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatchesComponent,
    StandingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
