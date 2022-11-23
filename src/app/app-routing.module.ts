import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TeamComponent} from "./components/team/team.component";
import {StandingsComponent} from "./components/standings/standings.component";

const routes: Routes = [
    {path: 'team/:name', component: TeamComponent},
    {path: 'home', component: StandingsComponent}
  ]
;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
