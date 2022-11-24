import {Component, OnInit} from '@angular/core';
import {StandingService} from "../../services/standing.service";
import {Table} from "../../classes/table";
import {Live} from "../../classes/live";
import {LiveScoreService} from "../../services/live-score.service";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit{
  public tables: Table[] = [];
  groups: string[] = ['A','B','C','D','E','F','G','H'];
  live: Live | undefined;
  minutes: any

  ngOnInit(): void {
    this.fetchStandings()
    window.setInterval(() => {
      this.fetchLive()
    }, 5000);
  }

  constructor(private standingsService:StandingService,private liveScore: LiveScoreService) {
  }



  ngOnDestroy(): void {
    // clearInterval(intervalId)
  }

  fetchLive() {
    this.liveScore.getLiveScore().then(
      () => {
        this.live = this.liveScore.live;
        //
        if (this.live?.match.status.description === 'first half') {
          let time = this.live?.time - this.live?.match.time?.start;
          this.minutes = Math.floor(time / 60);
        } else if (this.live?.match.status.description === '2nd half') {
          let time = this.live?.time - this.live?.match.time?.period;
          console.log(time)
          this.minutes = Math.floor(time / 60)+45;
          if(time>90){
            this.minutes = '90+'+(this.minutes-90);
          }
        } else if (this.live?.match.status.description === 'Halftime') {
          this.minutes = 'HT'
        }else if(this.live?.match.status.description === 'Ended'){
          this.minutes = 'FT'
        }
      },
      (error) => {
        console.log(error)
      })
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
