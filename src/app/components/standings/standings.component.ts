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
   tables: Table[] = [];
  groups: string[] = ['A','B','C','D','E','F','G','H'];
  live: Live | undefined;
  minutes: any
   match_time: any;

  ngOnInit(): void {
    this.fetchStandings()
    this.fetchLive()
    window.setInterval(() => {
      this.fetchLive()
    }, 10000);
  }

  constructor(private standingsService:StandingService,private liveScore: LiveScoreService) {
  }



  ngOnDestroy(): void {
    // clearInterval(intervalId)
  }

  async fetchLive() {
    await this.liveScore.getLiveScore().then(
      () => {
        this.live = this.liveScore.live;
        this.match_time = new Date(this.live?.match.time?.start*1000).toLocaleString();
        if (this.live?.match.status.description === '1st half') {
          let time = this.live?.time - this.live?.match.time?.start;
          this.minutes = Math.floor(time / 60);
          if(this.minutes>45){
            this.minutes = '45+' +(this.minutes-45);
          }
        } else if (this.live?.match.status.description === '2nd half') {
          let time = this.live?.time - this.live?.match.time?.period;
          this.minutes = Math.floor(time / 60)+45;
          if(this.minutes>90){
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

  async fetchStandings(){
    await this.standingsService.fetchTables().then(
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
