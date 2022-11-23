import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatchesComponent } from './components/matches/matches.component';
import { StandingsComponent } from './components/standings/standings.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { TeamComponent } from './components/team/team.component';
import {AboutBannerModule} from "about-banner";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatchesComponent,
    StandingsComponent,
    TeamComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AboutBannerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
