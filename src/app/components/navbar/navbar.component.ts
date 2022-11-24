import {Component, OnDestroy, OnInit} from '@angular/core';
import {LiveScoreService} from "../../services/live-score.service";
import {Away, Home, Live, LiveMatch, Referee, Score, Status, Team, Time, Venue} from "../../classes/live";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  live: Live | undefined;
  minutes: any

  ngOnInit(): void {
    window.setInterval(() => {
      this.fetchLive()
    }, 5000);

  }

  constructor(private liveScore: LiveScoreService) {
    // this.live = new Live("",
    //   new LiveMatch("",
    //     new Venue('', '', ''),
    //     new Team(new Home('', ''), new Away('', '')), new Referee('', ''),
    //     new Status('', ''),
    //     new Score('', ''),
    //     new Time('', '')
    //   ))
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


}
