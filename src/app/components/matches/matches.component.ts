import {Component, OnInit} from '@angular/core';
import {MatchService} from "../../services/match.service";
import {Match} from "../../classes/match";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] | undefined;

  ngOnInit(): void {
    this.getMatches()
  }

  constructor(private matchService: MatchService) {
    let match: Match = new Match("2", "A", 'TRUE', '1', '11/23/2022 22.00', 'ht', 'group', 'Argentina', 'Spain', '', '', '1');
    this.matches?.push(match);
  }


  private async getMatches() {
    await this.matchService.getMatches().then(
      () => {
        this.matches = this.matchService.matches;
        for(let match of this.matches){
          match.local_date = Date.parse(match.local_date);
        }
      },
      (error) => {
        console.log(error)
      })
  }
}
