import {Component, OnInit} from '@angular/core';
import {StandingService} from "../../services/standing.service";
import {Table} from "../../classes/table";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit{
  public tables: Table[] = [];
  groups: string[] = ['A','B','C','D','E','F','G','H'];

  ngOnInit(): void {
    this.fetchStandings()
  }

  constructor(private standingsService:StandingService) {
  }

  fetchStandings(){
    this.standingsService.fetchTables().then(
      () => {
        this.tables = this.standingsService.tables;
        for (let table of this.tables){
          table.teams.sort((a,b)=>b.pts-a.pts);
        }
      },
      (error) => {
        console.log(error)
      })
  }



}
