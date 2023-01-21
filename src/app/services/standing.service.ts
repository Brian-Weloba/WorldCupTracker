import { Injectable } from '@angular/core';
import { Table, Team } from '../classes/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StandingService {
  public tables: Table[] = [];
  public teams: Team[] = [];
  groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  constructor(private http: HttpClient) {}

  fetchTables() {
    return new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(
        this.http.get<any>(
          'https://projects.saturdev.tech/worldcupapi/standings'
        )
      ).then(
        (result) => {
          this.teams = result;
          for (let group in this.groups) {
            this.tables.push(new Table(this.groups[group], []));
          }

          this.teams.forEach((team) => {
            this.tables.forEach((table) => {
              if (table.group === team.group) {
                table.teams.push(team);
              }
            });
          });

          console.log(this.tables);
          resolve();
        },
        (err) => {
          console.log(err);
          reject();
        }
      );
    });
  }
}
