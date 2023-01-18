import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Match } from '../../classes/match';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  matches: Match[] | undefined;
  loading = false;
  err = false;
  modalmatch!: Match;

  showModal = false;
  toggleModal(match: any){
    this.showModal = !this.showModal;
    this.modalmatch = match
    console.log(this.modalmatch.home_scorers)
    this.modalmatch.home_scorers = this.modalmatch.home_scorers[0].split(',');
    this.modalmatch.away_scorers = this.modalmatch.away_scorers[0].split(',');

    if(this.modalmatch.home_scorers[0]==="null"){
      this.modalmatch.home_scorers = []
    }

    if(this.modalmatch.away_scorers[0]==="null"){
      this.modalmatch.away_scorers = []
    }
    console.log(this.modalmatch.home_scorers)
  }

  ngOnInit(): void {
    this.getMatches();
  }

  constructor(private matchService: MatchService) {
    let match: Match = new Match(
      '2',
      'A',
      'TRUE',
      '1',
      '11/23/2022 22.00',
      'ht',
      'group',
      'Argentina',
      'Spain',
      '',
      '',
      '1',
      [],
      []
    );
    this.matches?.push(match);
  }

  public async getMatches() {
    this.loading = true;
    this.err = false;
    console.log(this.loading)
    await this.matchService.getMatches().then(
      () => {
        this.matches = this.matchService.matches;
        for (let match of this.matches) {
          match.local_date = Date.parse(match.local_date);
        }
      },
      (error) => {
        console.log(error);
        this.err=true
      }
    );
    this.loading = false;
    console.log(this.loading)
  }
}
